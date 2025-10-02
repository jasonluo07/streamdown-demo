import { Streamdown } from 'streamdown';
import type { MermaidConfig } from 'mermaid';

const technicalDoc = `# 微服務架構技術文件

## 系統概述

本系統採用微服務架構設計，將應用程式拆分為多個獨立的服務單元，每個服務負責特定的業務功能。

## 架構圖

\`\`\`mermaid
graph TB
    subgraph 前端層
        A[Web 應用程式]
        B[行動應用程式]
    end

    subgraph API 層
        C[API Gateway]
        D[負載均衡器]
    end

    subgraph 服務層
        E[認證服務]
        F[使用者服務]
        G[訂單服務]
        H[支付服務]
        I[通知服務]
    end

    subgraph 資料層
        J[(使用者資料庫)]
        K[(訂單資料庫)]
        L[(快取層 Redis)]
        M[訊息佇列 RabbitMQ]
    end

    A --> C
    B --> C
    C --> D
    D --> E
    D --> F
    D --> G
    D --> H
    E --> J
    F --> J
    G --> K
    H --> M
    I --> M
    F --> L
    G --> L
\`\`\`

## 核心服務說明

### 1. API Gateway

**職責：** 作為系統的單一入口點，處理所有外部請求

**技術棧：** Node.js + Express

**主要功能：**
- 請求路由
- 身份驗證
- 請求限流
- API 版本管理

\`\`\`typescript
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// 認證服務路由
app.use('/api/auth', createProxyMiddleware({
  target: 'http://auth-service:3001',
  changeOrigin: true,
}));

// 使用者服務路由
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3002',
  changeOrigin: true,
}));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
\`\`\`

### 2. 認證服務

**職責：** 處理使用者認證和授權

**技術棧：** Node.js + JWT

\`\`\`typescript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface LoginRequest {
  email: string;
  password: string;
}

async function login(req: LoginRequest): Promise<string> {
  const user = await findUserByEmail(req.email);

  if (!user) {
    throw new Error('使用者不存在');
  }

  const isValid = await bcrypt.compare(req.password, user.passwordHash);

  if (!isValid) {
    throw new Error('密碼錯誤');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  return token;
}
\`\`\`

### 3. 訂單服務

**職責：** 管理訂單生命週期

**狀態機設計：**

\`\`\`mermaid
stateDiagram-v2
    [*] --> 待付款
    待付款 --> 已付款: 付款成功
    待付款 --> 已取消: 超時/使用者取消
    已付款 --> 處理中: 開始處理
    處理中 --> 已出貨: 出貨
    已出貨 --> 已完成: 使用者確認收貨
    已出貨 --> 退貨中: 申請退貨
    退貨中 --> 已退款: 退款完成
    已付款 --> 已退款: 直接退款
    已完成 --> [*]
    已取消 --> [*]
    已退款 --> [*]
\`\`\`

## 資料模型

### 使用者實體關係圖

\`\`\`mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        string id PK
        string email
        string name
        datetime createdAt
    }

    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        string id PK
        string userId FK
        string status
        decimal totalAmount
        datetime createdAt
    }

    ORDER_ITEM }o--|| PRODUCT : references
    ORDER_ITEM {
        string id PK
        string orderId FK
        string productId FK
        int quantity
        decimal price
    }

    PRODUCT {
        string id PK
        string name
        string description
        decimal price
        int stock
    }
\`\`\`

## 效能指標

| 服務 | 平均回應時間 | QPS | 可用性 |
|------|-------------|-----|--------|
| API Gateway | 15ms | 10,000 | 99.99% |
| 認證服務 | 25ms | 5,000 | 99.95% |
| 使用者服務 | 30ms | 8,000 | 99.98% |
| 訂單服務 | 45ms | 6,000 | 99.97% |
| 支付服務 | 200ms | 3,000 | 99.99% |

## 部署策略

### CI/CD 流程

\`\`\`mermaid
sequenceDiagram
    participant 開發者
    participant GitHub
    participant CI as GitHub Actions
    participant Registry as Docker Registry
    participant K8s as Kubernetes

    開發者->>GitHub: git push
    GitHub->>CI: 觸發工作流程
    CI->>CI: 執行測試
    CI->>CI: 建置 Docker 映像
    CI->>Registry: 推送映像
    CI->>K8s: 部署更新
    K8s-->>開發者: 部署完成通知
\`\`\`

### Kubernetes 配置範例

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: myregistry/user-service:latest
        ports:
        - containerPort: 3002
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
\`\`\`

## 監控與告警

### 監控指標

- **系統指標：** CPU、記憶體、磁碟、網路
- **應用指標：** 請求量、錯誤率、回應時間
- **業務指標：** 訂單量、支付成功率、使用者活躍度

### 告警規則範例

\`\`\`python
# Prometheus 告警規則
groups:
- name: service_alerts
  interval: 30s
  rules:
  - alert: HighErrorRate
    expr: |
      rate(http_requests_total{status=~"5.."}[5m])
      /
      rate(http_requests_total[5m]) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "服務錯誤率過高"
      description: "{{ $labels.service }} 錯誤率 {{ $value | humanizePercentage }}"

  - alert: SlowResponse
    expr: |
      histogram_quantile(0.95,
        rate(http_request_duration_seconds_bucket[5m])
      ) > 1
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "服務回應時間過長"
      description: "{{ $labels.service }} P95 回應時間 {{ $value }}s"
\`\`\`

## 安全性措施

### 1. 認證與授權

- ✅ 使用 JWT 進行身份驗證
- ✅ 實作基於角色的存取控制 (RBAC)
- ✅ API 金鑰管理

### 2. 資料加密

- ✅ HTTPS/TLS 傳輸加密
- ✅ 敏感資料加密存儲
- ✅ 密碼使用 bcrypt 雜湊

### 3. 防護措施

\`\`\`typescript
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100, // 最多 100 次請求
  message: '請求過於頻繁，請稍後再試'
});

app.use(limiter);

// 安全性標頭
app.use(helmet());

// CORS 配置
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
\`\`\`

## 災難恢復

### 備份策略

| 類型 | 頻率 | 保留期限 | 儲存位置 |
|------|------|---------|----------|
| 完整備份 | 每日 | 30 天 | AWS S3 |
| 增量備份 | 每小時 | 7 天 | AWS S3 |
| 資料庫快照 | 每 6 小時 | 14 天 | RDS |

### 恢復時間目標 (RTO/RPO)

$$
\\text{RTO} = \\text{恢復時間目標} \\leq 1 \\text{ 小時}
$$

$$
\\text{RPO} = \\text{恢復點目標} \\leq 15 \\text{ 分鐘}
$$

## 未來規劃

- [ ] 實作服務網格 (Service Mesh)
- [ ] 引入事件溯源 (Event Sourcing)
- [ ] 實作 CQRS 模式
- [ ] 建立多區域部署
- [ ] 實作自動擴展機制

## 參考資源

- [微服務架構設計模式](https://microservices.io/patterns/)
- [Kubernetes 官方文件](https://kubernetes.io/docs/)
- [Prometheus 監控指南](https://prometheus.io/docs/)

---

**文件版本：** v1.0.0
**最後更新：** 2025-01-15
**維護團隊：** 架構組
`;

const mermaidConfig: MermaidConfig = {
  theme: 'base',
  themeVariables: {
    primaryColor: '#4f46e5',
    primaryTextColor: '#fff',
    primaryBorderColor: '#6366f1',
    lineColor: '#818cf8',
    secondaryColor: '#8b5cf6',
    tertiaryColor: '#a78bfa',
    fontSize: '16px',
  },
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-950">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">技術文件範例</h1>
          <p className="text-gray-600 dark:text-gray-400">展示 Streamdown 在技術文件中的應用，包含流程圖、類別圖、狀態圖等</p>
        </div>

        <div className="rounded-lg border bg-white p-8 shadow-lg dark:bg-gray-900">
          <Streamdown
            parseIncompleteMarkdown={true}
            mermaidConfig={mermaidConfig}
            allowedImagePrefixes={['https://']}
            allowedLinkPrefixes={['https://', 'http://localhost', 'mailto:']}
            controls={{
              code: true,
              table: true,
              mermaid: true,
            }}
          >
            {technicalDoc}
          </Streamdown>
        </div>
      </div>
    </div>
  );
}
