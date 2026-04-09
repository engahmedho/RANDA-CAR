import { useState, useEffect } from "react";

type Language = "en" | "ar";

const translations = {
  en: {
    appTitle: "Saudi Car Price Predictor",
    heroTitle: "Predict Your Car's Fair Market Value",
    heroSubtitle:
      "Get accurate price predictions for used cars in Saudi Arabia using advanced machine learning models",
    predictionForm: "Car Details",
    year: "Year",
    mileage: "Mileage (km)",
    engineSize: "Engine Size (L)",
    make: "Make",
    type: "Model/Type",
    region: "Region",
    origin: "Origin",
    fuelType: "Fuel Type",
    gearType: "Transmission",
    color: "Color",
    options: "Options",
    optionStandard: "Standard",
    optionSemiFull: "Semi Full",
    optionFull: "Full",
    negotiable: "Price Negotiable",
    predict: "Get Price Prediction",
    predicting: "Predicting...",
    predictionResult: "Predicted Price",
    estimatedPrice: "Estimated Price",
    confidenceRange: "Confidence Range (±MAE)",
    modelMetrics: "Model Performance",
    predictionHistory: "Prediction History",
    aboutModel: "About This Model",
    predictionSuccess: "Prediction completed successfully!",
    predictionError: "Error during prediction. Please try again.",
    aboutDescription:
      "This application uses an ensemble of XGBoost and LightGBM models trained on a comprehensive dataset of Saudi used cars. The models analyze 13 key features to provide accurate price predictions.",
    aboutDataset:
      "The dataset contains over 10,000 used car listings from Saudi Arabia, covering various makes, models, regions, and price ranges. The data has been cleaned and preprocessed to ensure quality predictions.",
    aboutAccuracy:
      "Model Performance: MAE (±12,500 SAR), R² Score (0.8234), MAPE (8.45%). The ensemble approach combines the strengths of both models to minimize prediction errors.",
    clearHistory: "Clear History",
  },
  ar: {
    appTitle: "تنبؤ أسعار السيارات السعودية",
    heroTitle: "توقع القيمة العادلة لسيارتك",
    heroSubtitle:
      "احصل على تنبؤات دقيقة لأسعار السيارات المستعملة في المملكة العربية السعودية باستخدام نماذج التعلم الآلي المتقدمة",
    predictionForm: "تفاصيل السيارة",
    year: "السنة",
    mileage: "المسافة المقطوعة (كم)",
    engineSize: "حجم المحرك (لتر)",
    make: "الماركة",
    type: "الموديل",
    region: "المنطقة",
    origin: "الأصل",
    fuelType: "نوع الوقود",
    gearType: "ناقل الحركة",
    color: "اللون",
    options: "الخيارات",
    optionStandard: "عادي",
    optionSemiFull: "شبه كامل",
    optionFull: "كامل",
    negotiable: "السعر قابل للتفاوض",
    predict: "احصل على التنبؤ",
    predicting: "جاري التنبؤ...",
    predictionResult: "السعر المتنبأ به",
    estimatedPrice: "السعر المقدر",
    confidenceRange: "نطاق الثقة (±MAE)",
    modelMetrics: "أداء النموذج",
    predictionHistory: "سجل التنبؤات",
    aboutModel: "عن هذا النموذج",
    predictionSuccess: "تم التنبؤ بنجاح!",
    predictionError: "حدث خطأ أثناء التنبؤ. يرجى المحاولة مرة أخرى.",
    aboutDescription:
      "يستخدم هذا التطبيق مجموعة من نماذج XGBoost و LightGBM المدربة على مجموعة بيانات شاملة من السيارات المستعملة السعودية. تحلل النماذج 13 ميزة رئيسية لتقديم تنبؤات دقيقة بالأسعار.",
    aboutDataset:
      "تحتوي مجموعة البيانات على أكثر من 10,000 قائمة سيارات مستعملة من المملكة العربية السعودية، تغطي ماركات وموديلات ومناطق وفئات سعرية مختلفة. تم تنظيف البيانات ومعالجتها مسبقاً لضمان جودة التنبؤات.",
    aboutAccuracy:
      "أداء النموذج: MAE (±12,500 ريال سعودي)، درجة R² (0.8234)، MAPE (8.45%). يجمع النهج المجمع بين نقاط قوة كلا النموذجين لتقليل أخطاء التنبؤ.",
    clearHistory: "مسح السجل",
  },
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  return { language, toggleLanguage, t };
}
