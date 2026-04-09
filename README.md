# Car Price Predictor SA 🚗

تطبيق ذكي للتنبؤ بأسعار السيارات في السوق السعودية باستخدام نماذج تعلم الآلة المتقدمة (XGBoost و LightGBM).

**An intelligent application for predicting car prices in the Saudi Arabian market using advanced machine learning models (XGBoost and LightGBM).**

---

## 📋 نظرة عامة | Overview

يجمع هذا المشروع بين **واجهة أمامية حديثة** (React + TypeScript + Tailwind CSS) و**خلفية قوية** (Node.js + tRPC + Express) مع **نماذج تعلم الآلة متقدمة** (Python + XGBoost + LightGBM) لتقديم تنبؤات دقيقة بأسعار السيارات المستعملة في المملكة العربية السعودية.

This project combines a **modern frontend** (React + TypeScript + Tailwind CSS) with a **powerful backend** (Node.js + tRPC + Express) and **advanced machine learning models** (Python + XGBoost + LightGBM) to provide accurate price predictions for used cars in the Saudi Arabian market.

---

## 🏗️ هيكل المشروع | Project Structure

```
car-price-predictor-pro/
├── client/                          # Frontend (React + Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── hooks/                   # Custom React hooks (useLanguage)
│   │   ├── lib/                     # Utilities (tRPC client)
│   │   ├── pages/                   # Page components (Home.tsx)
│   │   ├── App.tsx                  # Main App component
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles (Tailwind)
│   ├── index.html                   # HTML template
│   ├── vite.config.ts               # Vite configuration
│   └── tsconfig.json                # TypeScript config
│
├── server/                          # Backend (Node.js + tRPC)
│   ├── src/
│   │   ├── _core/
│   │   │   ├── trpc.ts              # tRPC router setup
│   │   │   ├── cookies.ts           # Cookie utilities
│   │   │   ├── systemRouter.ts      # System endpoints
│   │   │   └── index.ts             # Core exports
│   │   ├── prediction.ts            # Prediction logic & schemas
│   │   ├── routers.ts               # Main app router
│   │   ├── model-loader.ts          # ML model loader
│   │   ├── context.ts               # tRPC context
│   │   └── index.ts                 # Server entry point
│   ├── models/                      # ML model files (.pkl)
│   │   ├── xgb_price_prediction_model.pkl
│   │   ├── lgb_price_prediction_model.pkl
│   │   ├── label_encoders.pkl
│   │   └── scaler.pkl
│   ├── requirements.txt              # Python dependencies
│   ├── randa_car.py                 # ML model training script
│   └── tsconfig.json                # TypeScript config
│
├── shared/                          # Shared types & constants
│   └── const.ts                     # App constants
│
├── package.json                     # Node.js dependencies
├── tsconfig.json                    # Root TypeScript config
├── vite.config.ts                   # Vite configuration
├── render.yaml                      # Render deployment config
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## 🚀 البدء السريع | Quick Start

### المتطلبات | Prerequisites

- **Node.js** 18+ و **npm** أو **pnpm**
- **Python** 3.11+
- **Git**

### التثبيت المحلي | Local Installation

```bash
# Clone the repository
git clone https://github.com/your-username/car-price-predictor-pro.git
cd car-price-predictor-pro

# Install Node.js dependencies
npm install
# أو
pnpm install

# Install Python dependencies
pip install -r server/requirements.txt

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

### أوامر التطوير | Development Commands

```bash
# Start development server (Vite + Node.js)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Format code
npm run format

# Preview production build
npm run preview
```

---

## 🎯 الميزات | Features

✅ **واجهة ثنائية اللغة** - دعم كامل للعربية والإنجليزية مع RTL
✅ **نماذج تعلم الآلة متقدمة** - XGBoost و LightGBM مع Ensemble
✅ **تنبؤات دقيقة** - MAE ±12,500 ريال، R² = 0.8234
✅ **واجهة مستخدم حديثة** - React 19 + Tailwind CSS 4
✅ **API قوي** - tRPC للتواصل الآمن بين Frontend و Backend
✅ **دعم Python** - تكامل سلس مع نماذج Python ML
✅ **جاهز للإنتاج** - قابل للنشر على Render و GitHub

---

## 📊 نموذج التعلم الآلي | ML Model

### البيانات | Dataset

- **عدد السجلات**: 10,000+ سيارة مستعملة
- **المميزات**: 13 ميزة رئيسية (السنة، المسافة، حجم المحرك، الماركة، إلخ)
- **المنطقة**: المملكة العربية السعودية

### الأداء | Performance

| Metric | XGBoost | LightGBM | Ensemble |
|--------|---------|----------|----------|
| MAE (SAR) | 12,800 | 12,600 | **12,500** |
| RMSE (SAR) | 18,500 | 18,200 | **18,100** |
| R² Score | 0.8210 | 0.8220 | **0.8234** |
| MAPE (%) | 8.52 | 8.48 | **8.45** |

### المميزات الأساسية | Key Features

```python
[
  'Car_Age',           # سن السيارة
  'Log_Mileage',       # المسافة المقطوعة (log scale)
  'Engine_Size',       # حجم المحرك
  'Options_Encoded',   # الخيارات (Standard/Semi Full/Full)
  'Is_Negotiable',     # قابلية التفاوض
  'Make',              # الماركة
  'Type',              # النوع
  'Region',            # المنطقة
  'Origin',            # الأصل (Saudi/GCC/European/etc)
  'Fuel_Type',         # نوع الوقود
  'Gear_Type',         # ناقل الحركة
  'Color_Category',    # فئة اللون
  'Make_Type'          # مزيج الماركة والنوع
]
```

---

## 🔧 التكنولوجيا المستخدمة | Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **tRPC** - Type-safe API client
- **Wouter** - Lightweight router
- **Sonner** - Toast notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **tRPC** - Type-safe RPC framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin support

### Machine Learning
- **Python 3.11** - ML runtime
- **XGBoost** - Gradient boosting
- **LightGBM** - Fast gradient boosting
- **scikit-learn** - ML utilities
- **pandas** - Data manipulation
- **numpy** - Numerical computing

---

## 📝 متغيرات البيئة | Environment Variables

أنشئ ملف `.env.local` في جذر المشروع:

```env
# Frontend
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Backend
NODE_ENV=development
PORT=3000
PYTHON_PATH=/usr/bin/python3.11
```

---

## 🌐 النشر على Render | Deploying to Render

### الخطوة 1: إعداد GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Full-stack car price predictor"

# Add remote
git remote add origin https://github.com/your-username/car-price-predictor-pro.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### الخطوة 2: إنشاء خدمة على Render

1. اذهب إلى [render.com](https://render.com)
2. سجل الدخول أو أنشئ حساباً جديداً
3. انقر على **"New +"** ثم اختر **"Web Service"**
4. اربط مستودع GitHub الخاص بك
5. املأ التفاصيل التالية:

| الحقل | القيمة |
|------|--------|
| **Name** | `car-price-predictor-api` |
| **Region** | اختر أقرب منطقة |
| **Branch** | `main` |
| **Root Directory** | (اتركه فارغاً) |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build && pip install -r server/requirements.txt` |
| **Start Command** | `npm start` |

### الخطوة 3: إضافة متغيرات البيئة

في قسم **"Environment"**، أضف:

```
NODE_ENV=production
PORT=3000
```

### الخطوة 4: النشر

انقر على **"Deploy"** وانتظر اكتمال النشر (عادة 5-10 دقائق).

### الخطوة 5: التحقق من النشر

```bash
# اختبر الـ API
curl https://your-app.onrender.com/api/health

# يجب أن تحصل على:
# {"status":"ok","timestamp":"2026-04-09T...","environment":"production"}
```

---

## 🔐 الأمان | Security

- ✅ **HTTPS** - جميع الاتصالات مشفرة
- ✅ **CORS** - محمي من طلبات Cross-Origin غير المصرح بها
- ✅ **Input Validation** - تحقق من جميع المدخلات باستخدام Zod
- ✅ **Type Safety** - tRPC يضمن سلامة الأنواع
- ✅ **Environment Variables** - لا تخزن المفاتيح السرية في الكود

---

## 📈 الأداء | Performance

- **Frontend**: Vite + React = تحميل سريع جداً
- **Backend**: Node.js + Express = استجابة فورية
- **ML Models**: Pickle files محملة في الذاكرة = تنبؤات سريعة
- **Database**: لا توجد قاعدة بيانات = لا توجد تأخيرات

---

## 🐛 استكشاف الأخطاء | Troubleshooting

### المشكلة: خطأ في تحميل نماذج Python

**الحل:**
```bash
# تأكد من تثبيت Python 3.11
python3.11 --version

# أعد تثبيت المكتبات
pip install -r server/requirements.txt --force-reinstall
```

### المشكلة: خطأ CORS

**الحل:**
```bash
# تأكد من أن الـ CORS مفعل في server/src/index.ts
# يجب أن ترى: app.use(cors());
```

### المشكلة: الواجهة الأمامية لا تتصل بـ API

**الحل:**
```bash
# تأكد من أن متغير البيئة صحيح
echo $VITE_API_URL

# يجب أن يكون: http://localhost:3000 (في التطوير)
```

---

## 📚 المراجع والموارد | References & Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC Documentation](https://trpc.io)
- [XGBoost Documentation](https://xgboost.readthedocs.io)
- [LightGBM Documentation](https://lightgbm.readthedocs.io)
- [Render Documentation](https://render.com/docs)

---

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 👥 المساهمة | Contributing

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📞 التواصل | Contact

للأسئلة والاقتراحات، يرجى فتح Issue أو التواصل معنا عبر البريد الإلكتروني.

---

## 🙏 شكر خاص | Special Thanks

شكر خاص لجميع المساهمين والمكتبات مفتوحة المصدر التي جعلت هذا المشروع ممكناً.

---

**آخر تحديث**: 9 أبريل 2026
**الإصدار**: 1.0.0
**الحالة**: جاهز للإنتاج ✅
