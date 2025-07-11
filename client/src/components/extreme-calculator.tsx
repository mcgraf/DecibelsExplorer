import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { extremeExamples } from "@/data/sound-examples";
import { formatScientificNotation, calculateIntensityFromDecibel, getCosmicComparison } from "@/lib/decibel-utils";
import { AlertTriangle, Zap, Info } from "lucide-react";

export function ExtremeCalculator() {
  const [extremeDecibel, setExtremeDecibel] = useState<string>("");
  
  const decibelValue = parseFloat(extremeDecibel);
  const isValidInput = !isNaN(decibelValue) && decibelValue >= 0;
  
  const extremeIntensity = isValidInput ? calculateIntensityFromDecibel(decibelValue) : 0;
  const cosmicComparison = isValidInput ? getCosmicComparison(decibelValue) : null;

  return (
    <section id="extreme" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
          Extreme Decibel Calculator
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="gradient-extreme border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-700">
                  Warning: Entering Impossible Territory!
                </h3>
                <p className="text-gray-700 mt-2">
                  Explore what happens when we push the decibel scale to cosmic extremes
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="extreme-db">Enter Extreme Decibel Value:</Label>
                  <Input
                    id="extreme-db"
                    type="number"
                    placeholder="Enter dB (try 1000+)"
                    value={extremeDecibel}
                    onChange={(e) => setExtremeDecibel(e.target.value)}
                    min="0"
                    max="10000"
                    className="focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Energy Intensity:
                      </h4>
                      <div className="text-lg font-mono text-red-600">
                        {isValidInput 
                          ? `${formatScientificNotation(extremeIntensity)} W/m²`
                          : "Enter a value above"
                        }
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Watts per square meter
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-orange-700 mb-3">
                        Cosmic Comparison:
                      </h4>
                      <div className="text-sm text-orange-600">
                        {cosmicComparison || "Enter a decibel value to see comparison"}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-purple-700 mb-3">
                      Absurd Scenarios:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                          300 dB
                        </Badge>
                        <span className="text-gray-700">
                          Louder than a supernova explosion
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-red-100 text-red-800 px-3 py-1">
                          1000 dB
                        </Badge>
                        <span className="text-gray-700">
                          Energy equivalent to annihilating several galaxies
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
                          10000 dB
                        </Badge>
                        <span className="text-gray-700">
                          Transcends the concept of sound itself
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Fun Fact:
                    </h4>
                    <p className="text-yellow-700 text-sm">
                      At around 194 dB, sound waves can no longer propagate through air as we know it. 
                      Beyond this point, we're dealing with shock waves and theoretical physics!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Real vs Impossible Comparison */}
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">
                Real vs. Impossible Decibel Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-secondary mb-4">Real World Maximum:</h4>
                  <div className="space-y-3">
                    {extremeExamples.slice(0, 3).map((example, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{example.name}</span>
                        <Badge className="bg-red-100 text-red-800">
                          {example.decibels} dB
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-4">Impossible Territory:</h4>
                  <div className="space-y-3">
                    {extremeExamples.slice(3).map((example, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{example.name}</span>
                        <Badge className="bg-purple-100 text-purple-800">
                          {example.decibels >= 1000 ? '1000+' : example.decibels} dB
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
