import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, TrendingUp, Info } from "lucide-react";
import { toast } from "sonner";

interface PredictionHistory {
  id: string;
  input: any;
  output: any;
  timestamp: Date;
}

export default function Home() {
  const { language, toggleLanguage, t } = useLanguage();
  const isRTL = language === "ar";
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    year: 2020,
    mileage: 50000,
    engineSize: 2.0,
    make: "Toyota",
    type: "Camry",
    region: "Riyadh",
    origin: "Saudi",
    fuelType: "Gas",
    gearType: "Automatic",
    color: "White",
    options: "Full" as const,
    negotiable: false,
  });

  // Fetch dropdown values
  const { data: dropdownValues } = trpc.prediction.getDropdownValues.useQuery();
  const { data: modelMetrics } = trpc.prediction.getModelMetrics.useQuery();
  const predictMutation = trpc.prediction.predict.useMutation();

  const availableModels = useMemo(() => {
    if (!dropdownValues) return [];
    return dropdownValues.modelsByMake[formData.make] ?? [];
  }, [dropdownValues, formData.make]);

  useEffect(() => {
    if (availableModels.length === 0) return;
    if (!availableModels.includes(formData.type)) {
      setFormData((prev) => ({
        ...prev,
        type: availableModels[0],
      }));
    }
  }, [availableModels, formData.type]);

  const handlePredict = async () => {
    try {
      const result = await predictMutation.mutateAsync(formData);
      const newPrediction: PredictionHistory = {
        id: Date.now().toString(),
        input: formData,
        output: result,
        timestamp: new Date(),
      };
      setPredictions([newPrediction, ...predictions]);
      toast.success(t("predictionSuccess"));
    } catch (error) {
      toast.error(t("predictionError"));
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const latestPrediction = predictions[0];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {t("appTitle")}
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="border-slate-600 text-slate-200 hover:bg-slate-800"
          >
            {language === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">{t("heroTitle")}</h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prediction Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t("predictionForm")}
              </h3>

              <div className="space-y-4">
                {/* Year and Mileage */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">{t("year")}</Label>
                    <Input
                      type="number"
                      min="1990"
                      max="2026"
                      value={formData.year}
                      onChange={(e) =>
                        handleInputChange("year", parseInt(e.target.value))
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">{t("mileage")}</Label>
                    <Input
                      type="number"
                      min="0"
                      max="500000"
                      value={formData.mileage}
                      onChange={(e) =>
                        handleInputChange("mileage", parseInt(e.target.value))
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                {/* Engine Size */}
                <div>
                  <Label className="text-slate-300">{t("engineSize")}</Label>
                  <Input
                    type="number"
                    min="0.8"
                    max="8.0"
                    step="0.1"
                    value={formData.engineSize}
                    onChange={(e) =>
                      handleInputChange("engineSize", parseFloat(e.target.value))
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Make and Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">{t("make")}</Label>
                    <Select
                      value={formData.make}
                      onValueChange={(value) => {
                        const nextModels = dropdownValues?.modelsByMake[value] ?? [];
                        setFormData((prev) => ({
                          ...prev,
                          make: value,
                          // Keep the existing model only if valid for the selected make.
                          type: nextModels.includes(prev.type) ? prev.type : (nextModels[0] ?? ""),
                        }));
                      }}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {dropdownValues?.makes.map((make) => (
                          <SelectItem
                            key={make}
                            value={make}
                            className="text-white"
                          >
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">{t("type")}</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleInputChange("type", value)}
                      disabled={availableModels.length === 0}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {availableModels.map((model) => (
                          <SelectItem
                            key={model}
                            value={model}
                            className="text-white"
                          >
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Region and Origin */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">{t("region")}</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) =>
                        handleInputChange("region", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {dropdownValues?.regions.map((region) => (
                          <SelectItem
                            key={region}
                            value={region}
                            className="text-white"
                          >
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">{t("origin")}</Label>
                    <Select
                      value={formData.origin}
                      onValueChange={(value) =>
                        handleInputChange("origin", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {dropdownValues?.origins.map((origin) => (
                          <SelectItem
                            key={origin}
                            value={origin}
                            className="text-white"
                          >
                            {origin}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Fuel Type and Gear Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">{t("fuelType")}</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value) =>
                        handleInputChange("fuelType", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {dropdownValues?.fuelTypes.map((fuel) => (
                          <SelectItem
                            key={fuel}
                            value={fuel}
                            className="text-white"
                          >
                            {fuel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">{t("gearType")}</Label>
                    <Select
                      value={formData.gearType}
                      onValueChange={(value) =>
                        handleInputChange("gearType", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {dropdownValues?.gearTypes.map((gear) => (
                          <SelectItem
                            key={gear}
                            value={gear}
                            className="text-white"
                          >
                            {gear}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Color and Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">{t("color")}</Label>
                    <Select
                      value={formData.color}
                      onValueChange={(value) =>
                        handleInputChange("color", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {dropdownValues?.colors.map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className="text-white"
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">{t("options")}</Label>
                    <Select
                      value={formData.options}
                      onValueChange={(value: any) =>
                        handleInputChange("options", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="Standard" className="text-white">
                          {t("optionStandard")}
                        </SelectItem>
                        <SelectItem value="Semi Full" className="text-white">
                          {t("optionSemiFull")}
                        </SelectItem>
                        <SelectItem value="Full" className="text-white">
                          {t("optionFull")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Negotiable Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <Label className="text-slate-300">{t("negotiable")}</Label>
                  <Switch
                    checked={formData.negotiable}
                    onCheckedChange={(checked) =>
                      handleInputChange("negotiable", checked)
                    }
                  />
                </div>

                {/* Predict Button */}
                <Button
                  onClick={handlePredict}
                  disabled={predictMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg"
                >
                  {predictMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("predicting")}
                    </>
                  ) : (
                    t("predict")
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            {latestPrediction && (
              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700 p-6">
                <h4 className="text-lg font-bold text-white mb-4">
                  {t("predictionResult")}
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-green-200 text-sm">{t("estimatedPrice")}</p>
                    <p className="text-4xl font-bold text-white">
                      {latestPrediction.output.predictedPrice.toLocaleString(
                        isRTL ? "ar-SA" : "en-US"
                      )}{" "}
                      <span className="text-lg">SAR</span>
                    </p>
                  </div>
                  <div className="border-t border-green-700 pt-3">
                    <p className="text-green-200 text-sm">{t("confidenceRange")}</p>
                    <p className="text-white">
                      {latestPrediction.output.confidence.lower.toLocaleString(
                        isRTL ? "ar-SA" : "en-US"
                      )}{" "}
                      -{" "}
                      {latestPrediction.output.confidence.upper.toLocaleString(
                        isRTL ? "ar-SA" : "en-US"
                      )}{" "}
                      SAR
                    </p>
                  </div>
                  <div className="border-t border-green-700 pt-3">
                    <p className="text-green-200 text-xs">
                      {new Date(latestPrediction.output.timestamp).toLocaleString(
                        isRTL ? "ar-SA" : "en-US"
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Model Metrics */}
            {modelMetrics && (
              <Card className="bg-slate-800 border-slate-700 p-6">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {t("modelMetrics")}
                </h4>
                <div className="space-y-2 text-slate-300 text-sm">
                  <div className="flex justify-between">
                    <span>MAE:</span>
                    <span className="text-white font-semibold">
                      {modelMetrics.mae.toLocaleString(isRTL ? "ar-SA" : "en-US")} SAR
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>R² Score:</span>
                    <span className="text-white font-semibold">
                      {modelMetrics.r2.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAPE:</span>
                    <span className="text-white font-semibold">
                      {modelMetrics.mape.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* History and About Buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-200 hover:bg-slate-800"
                onClick={() => setShowHistory(!showHistory)}
              >
                {t("predictionHistory")} ({predictions.length})
              </Button>
              {predictions.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-200 hover:bg-red-900/20"
                  onClick={() => setPredictions([])}
                >
                  {t("clearHistory")}
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-200 hover:bg-slate-800"
                onClick={() => setShowAbout(!showAbout)}
              >
                {t("aboutModel")}
              </Button>
            </div>
          </div>
        </div>

        {/* History Section */}
        {showHistory && predictions.length > 0 && (
          <Card className="bg-slate-800 border-slate-700 p-6 mt-6">
            <h4 className="text-lg font-bold text-white mb-4">{t("predictionHistory")}</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {predictions.map((pred) => (
                <div
                  key={pred.id}
                  className="bg-slate-700 p-3 rounded flex justify-between items-center text-sm text-slate-300"
                >
                  <span>
                    {pred.input.year} {pred.input.make} {pred.input.type}
                  </span>
                  <span className="font-bold text-white">
                    {pred.output.predictedPrice.toLocaleString(
                      isRTL ? "ar-SA" : "en-US"
                    )}{" "}
                    SAR
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* About Section */}
        {showAbout && (
          <Card className="bg-slate-800 border-slate-700 p-6 mt-6">
            <h4 className="text-lg font-bold text-white mb-4">{t("aboutModel")}</h4>
            <div className="text-slate-300 space-y-3 text-sm">
              <p>{t("aboutDescription")}</p>
              <p>{t("aboutDataset")}</p>
              <p>{t("aboutAccuracy")}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
