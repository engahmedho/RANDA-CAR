# البدء السريع | Quick Start Guide

## 🚀 5 دقائق فقط للبدء!

### 1️⃣ تثبيت التبعيات | Install Dependencies
```bash
npm install
pip install -r server/requirements.txt
```

### 2️⃣ بدء الخادم | Start Development Server
```bash
npm run dev
```

### 3️⃣ فتح المتصفح | Open Browser
```
http://localhost:3000
```

### 4️⃣ جرب التطبيق | Test the App
- أدخل بيانات السيارة | Enter car details
- اضغط "توقع السعر" | Click "Predict Price"
- احصل على التنبؤ! | Get your prediction!

---

## 📦 البناء للإنتاج | Production Build

```bash
npm run build
npm start
```

---

## 🌐 النشر على Render | Deploy to Render

1. ادفع المشروع إلى GitHub | Push to GitHub
2. اذهب إلى https://render.com | Go to Render
3. اختر "Web Service" | Choose "Web Service"
4. اربط مستودعك | Connect your repo
5. استخدم هذه الأوامر | Use these commands:
   - **Build**: `npm install && npm run build && pip install -r server/requirements.txt`
   - **Start**: `npm start`

---

## 📁 هيكل المشروع | Project Structure

```
car-price-predictor-pro/
├── client/          # React Frontend
├── server/          # Node.js Backend
│   ├── src/         # Backend source code
│   ├── models/      # ML model files (.pkl)
│   └── requirements.txt
├── shared/          # Shared types
├── README.md        # Full documentation
├── DEPLOYMENT_GUIDE.md
└── QUICK_START.md   # This file
```

---

## 🐛 المساعدة | Help

- اقرأ [README.md](README.md) للتفاصيل الكاملة
- اقرأ [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) لتعليمات النشر
- افتح Issue على GitHub للمساعدة

---

## ✅ قائمة التحقق | Checklist

- [ ] تم تثبيت Node.js 18+
- [ ] تم تثبيت Python 3.11+
- [ ] تم تثبيت npm dependencies
- [ ] تم تثبيت Python dependencies
- [ ] يعمل الخادم محلياً
- [ ] تم اختبار التطبيق
- [ ] جاهز للنشر على GitHub و Render!

---

**استمتع بالتطبيق! 🎉**
