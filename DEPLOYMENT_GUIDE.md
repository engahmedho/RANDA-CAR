# دليل النشر الشامل | Complete Deployment Guide

هذا الدليل يشرح خطوة بخطوة كيفية نشر تطبيق Car Price Predictor على GitHub و Render.

---

## 📋 قائمة التحقق قبل النشر | Pre-Deployment Checklist

- [ ] تم تثبيت جميع التبعيات (`npm install`)
- [ ] تم اختبار التطبيق محلياً (`npm run dev`)
- [ ] تم التحقق من عدم وجود أخطاء TypeScript (`npm run check`)
- [ ] تم إنشاء حساب GitHub
- [ ] تم إنشاء حساب Render
- [ ] تم إنشاء ملف `.env.local` بالمتغيرات الصحيحة

---

## 🔧 الخطوة 1: إعداد المشروع محلياً

### 1.1 تثبيت التبعيات

```bash
# تثبيت Node.js dependencies
npm install

# تثبيت Python dependencies
pip install -r server/requirements.txt
```

### 1.2 اختبار التطبيق

```bash
# بدء خادم التطوير
npm run dev

# افتح المتصفح على http://localhost:3000
```

### 1.3 التحقق من عدم وجود أخطاء

```bash
# التحقق من أخطاء TypeScript
npm run check

# بناء المشروع
npm run build
```

---

## 🐙 الخطوة 2: رفع المشروع إلى GitHub

### 2.1 إنشاء مستودع على GitHub

1. اذهب إلى [github.com/new](https://github.com/new)
2. أدخل اسم المستودع: `car-price-predictor-pro`
3. اختر **Public** (للسماح للآخرين برؤيته)
4. انقر على **Create repository**

### 2.2 دفع المشروع إلى GitHub

```bash
# في مجلد المشروع
cd /home/ubuntu/car-price-predictor-pro

# تهيئة Git (إذا لم يتم بالفعل)
git init

# إضافة جميع الملفات
git add .

# Commit
git commit -m "Initial commit: Full-stack car price predictor with ML models"

# إضافة الـ remote
git remote add origin https://github.com/YOUR_USERNAME/car-price-predictor-pro.git

# تغيير اسم الفرع الرئيسي إلى main
git branch -M main

# دفع المشروع
git push -u origin main
```

### 2.3 التحقق من رفع المشروع

اذهب إلى `https://github.com/YOUR_USERNAME/car-price-predictor-pro` وتأكد من وجود جميع الملفات.

---

## 🚀 الخطوة 3: النشر على Render

### 3.1 إنشاء حساب Render

1. اذهب إلى [render.com](https://render.com)
2. انقر على **Sign up** واختر **GitHub**
3. وافق على الأذونات المطلوبة
4. أكمل إعداد الحساب

### 3.2 إنشاء Web Service

1. بعد تسجيل الدخول، انقر على **New +**
2. اختر **Web Service**
3. ابحث عن مستودعك `car-price-predictor-pro` وانقر على **Connect**

### 3.3 تكوين الخدمة

ملأ النموذج بالمعلومات التالية:

| الحقل | القيمة | الشرح |
|------|--------|-------|
| **Name** | `car-price-predictor-api` | اسم الخدمة |
| **Environment** | `Node` | بيئة التشغيل |
| **Region** | `Singapore` أو الأقرب لك | المنطقة الجغرافية |
| **Branch** | `main` | الفرع المراد نشره |
| **Build Command** | `npm install && npm run build && pip install -r server/requirements.txt` | أمر البناء |
| **Start Command** | `npm start` | أمر البدء |
| **Plan** | `Free` | خطة التسعير |

### 3.4 إضافة متغيرات البيئة

انقر على **Advanced** ثم **Add Environment Variable**:

```
NODE_ENV = production
PORT = 3000
```

### 3.5 النشر

انقر على **Create Web Service** وانتظر اكتمال النشر (عادة 5-10 دقائق).

---

## ✅ التحقق من النشر

### 4.1 اختبار الـ API

```bash
# استبدل YOUR_APP_URL بـ URL تطبيقك على Render
curl https://YOUR_APP_URL.onrender.com/api/health

# يجب أن تحصل على:
{
  "status": "ok",
  "timestamp": "2026-04-09T10:52:22.860Z",
  "environment": "production"
}
```

### 4.2 اختبار الواجهة الأمامية

1. افتح المتصفح على `https://YOUR_APP_URL.onrender.com`
2. يجب أن ترى الواجهة الأمامية
3. جرب إدخال بيانات السيارة والحصول على التنبؤ

### 4.3 اختبار التنبؤ

```bash
# اختبر endpoint التنبؤ
curl -X POST https://YOUR_APP_URL.onrender.com/api/trpc/prediction.predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "mileage": 50000,
    "engineSize": 2.0,
    "make": "Toyota",
    "type": "Camry",
    "region": "Riyadh",
    "origin": "Saudi",
    "fuelType": "Gas",
    "gearType": "Automatic",
    "color": "White",
    "options": "Full",
    "negotiable": false
  }'
```

---

## 🔄 التحديثات المستقبلية

### تحديث الكود

```bash
# عدل الملفات حسب الحاجة

# أضف التغييرات
git add .

# Commit
git commit -m "Fix: description of changes"

# دفع التحديثات
git push origin main

# Render سيكتشف التغييرات تلقائياً وسيعيد النشر
```

### تحديث نماذج ML

إذا أردت تحديث نماذج ML:

1. أعد تدريب النماذج باستخدام `server/randa_car.py`
2. استبدل ملفات `.pkl` في `server/models/`
3. ادفع التغييرات إلى GitHub
4. Render سيعيد النشر تلقائياً

---

## 🐛 استكشاف الأخطاء الشائعة

### المشكلة: خطأ في البناء "Cannot find module"

**الحل:**
```bash
# تأكد من تثبيت جميع التبعيات
npm install --legacy-peer-deps

# أعد البناء
npm run build
```

### المشكلة: خطأ Python "ModuleNotFoundError"

**الحل:**
```bash
# تأكد من أن requirements.txt موجود في جذر server/
pip install -r server/requirements.txt

# تحقق من أن Python 3.11 مثبت
python3.11 --version
```

### المشكلة: الخدمة تتوقف بعد دقائق قليلة

**الحل:**
- تأكد من أن `npm start` يبدأ الخادم بشكل صحيح
- تحقق من السجلات في Render dashboard
- تأكد من عدم وجود أخطاء في `server/src/index.ts`

### المشكلة: الواجهة الأمامية لا تتصل بـ API

**الحل:**
```bash
# تأكد من أن CORS مفعل في server/src/index.ts
# يجب أن ترى: app.use(cors());

# تأكد من أن API URL صحيح في الواجهة الأمامية
# يجب أن يكون: https://YOUR_APP_URL.onrender.com/api/trpc
```

---

## 📊 مراقبة الأداء

### عرض السجلات

1. اذهب إلى Render dashboard
2. اختر خدمتك `car-price-predictor-api`
3. انقر على **Logs** لعرض السجلات الحية

### مراقبة الاستخدام

1. اذهب إلى **Metrics**
2. شاهد استخدام CPU والذاكرة
3. شاهد عدد الطلبات

---

## 🔐 الأمان

### حماية البيانات الحساسة

- ✅ لا تخزن مفاتيح API في الكود
- ✅ استخدم متغيرات البيئة فقط
- ✅ لا تشارك ملفات `.env`

### تحديث التبعيات

```bash
# تحقق من التحديثات المتاحة
npm outdated

# حدّث التبعيات
npm update

# حدّث Python dependencies
pip install --upgrade -r server/requirements.txt
```

---

## 📞 الدعم

إذا واجهت مشاكل:

1. تحقق من السجلات في Render
2. اقرأ [Render Documentation](https://render.com/docs)
3. افتح Issue على GitHub
4. اطلب المساعدة في المجتمع

---

**تم التحديث**: 9 أبريل 2026
**الإصدار**: 1.0.0
