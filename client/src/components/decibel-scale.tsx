import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { soundExamples } from "@/data/sound-examples";
import { calculateIntensityFromDecibel, formatScientificNotation, getSoundCategory, getCategoryColor, getHearingDamageWarning } from "@/lib/decibel-utils";
import { Volume, VolumeX, Volume1, Volume2, AlertTriangle } from "lucide-react";

export function DecibelScale() {
  const [selectedDecibel, setSelectedDecibel] = useState(60);
  
  const selectedExample = soundExamples.find(
    example => Math.abs(example.decibels - selectedDecibel) <= 5
  ) || soundExamples[0];
  
  const energyIntensity = calculateIntensityFromDecibel(selectedDecibel);
  const category = getSoundCategory(selectedDecibel);
  const categoryColor = getCategoryColor(category);
  const warning = getHearingDamageWarning(selectedDecibel);
  
  const getVolumeIcon = (decibels: number) => {
    if (decibels === 0) return <VolumeX className="h-5 w-5" />;
    if (decibels < 40) return <Volume className="h-5 w-5" />;
    if (decibels < 80) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <section id="scale" className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
          Interactive Decibel Scale
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-6 w-6" />
                Explore Sound Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    value={[selectedDecibel]}
                    onValueChange={(value) => setSelectedDecibel(value[0])}
                    max={140}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0 dB</span>
                    <span>70 dB</span>
                    <span>140 dB</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-primary mb-2">Current Level:</h4>
                      <div className="text-3xl font-bold text-primary">{selectedDecibel} dB</div>
                      <div className="text-muted-foreground">{selectedExample.name}</div>
                      <Badge className={`mt-2 ${categoryColor}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Energy Intensity:</h4>
                      <div className="text-lg font-mono">
                        {formatScientificNotation(energyIntensity)} W/m²
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Watts per square meter
                      </div>
                    </CardContent>
                  </Card>

                  {warning && (
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Warning:
                        </h4>
                        <div className="text-sm text-red-700">{warning}</div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Common Sound Examples:</h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {soundExamples.map((example) => (
                      <div
                        key={example.id}
                        className={`flex justify-between items-center p-3 rounded-lg transition-colors cursor-pointer ${
                          Math.abs(example.decibels - selectedDecibel) <= 5
                            ? 'bg-primary/10 border border-primary/20'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedDecibel(example.decibels)}
                      >
                        <div className="flex items-center space-x-3">
                          {getVolumeIcon(example.decibels)}
                          <div>
                            <div className="text-sm font-medium">{example.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {example.description}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getCategoryColor(example.category)} text-xs`}>
                          {example.decibels} dB
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
