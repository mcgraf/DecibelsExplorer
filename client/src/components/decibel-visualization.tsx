import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { calculateIntensityFromDecibel, calculateEnergyRatio, formatScientificNotation } from "@/lib/decibel-utils";
import { BarChart3, Zap, Volume2, Play } from "lucide-react";

export function DecibelVisualization() {
  const [baseDecibel, setBaseDecibel] = useState(20);
  const [compareDecibel, setCompareDecibel] = useState(30);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const baseIntensity = calculateIntensityFromDecibel(baseDecibel);
  const compareIntensity = calculateIntensityFromDecibel(compareDecibel);
  const energyRatio = calculateEnergyRatio(baseDecibel, compareDecibel);
  const decibelDifference = Math.abs(compareDecibel - baseDecibel);

  // Animation demo values
  const demoValues = [
    { db: 10, label: "10 dB" },
    { db: 20, label: "20 dB (10× energy)" },
    { db: 30, label: "30 dB (100× energy)" },
    { db: 40, label: "40 dB (1,000× energy)" },
    { db: 50, label: "50 dB (10,000× energy)" }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    const interval = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= demoValues.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  // Calculate bar heights for visualization (logarithmic scale)
  const getBarHeight = (decibel: number) => {
    const intensity = calculateIntensityFromDecibel(decibel);
    const maxIntensity = calculateIntensityFromDecibel(60); // Reference for scaling
    return Math.min((Math.log10(intensity / 1e-12) / Math.log10(maxIntensity / 1e-12)) * 100, 100);
  };

  const getEnergyBlocks = (decibel: number) => {
    const ratio = Math.pow(10, (decibel - 10) / 10);
    return Math.min(Math.round(ratio), 100);
  };

  return (
    <section id="visualization" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
          Interactive Decibel Visualization
        </h2>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Interactive Comparison */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                Compare Decibel Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Base Level: {baseDecibel} dB</label>
                    <Slider
                      value={[baseDecibel]}
                      onValueChange={(value) => setBaseDecibel(value[0])}
                      max={80}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Compare Level: {compareDecibel} dB</label>
                    <Slider
                      value={[compareDecibel]}
                      onValueChange={(value) => setCompareDecibel(value[0])}
                      max={80}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-primary mb-2">Energy Ratio:</h4>
                      <div className="text-2xl font-bold text-primary">
                        {energyRatio.toFixed(1)}× more energy
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {decibelDifference} dB difference
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-secondary mb-2">Logarithmic Rule:</h4>
                      <div className="text-sm">
                        Every +10 dB = 10× more energy<br/>
                        Every +20 dB = 100× more energy<br/>
                        Every +30 dB = 1,000× more energy
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Visual Bar Chart */}
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 text-center">Energy Intensity Comparison</h4>
                  <div className="flex items-end justify-center space-x-8 h-32">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-16 bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-500 rounded-t-md"
                        style={{ height: `${getBarHeight(baseDecibel)}%` }}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-sm font-medium">{baseDecibel} dB</div>
                        <div className="text-xs text-muted-foreground">
                          {formatScientificNotation(baseIntensity)} W/m²
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-16 bg-gradient-to-t from-orange-500 to-orange-300 transition-all duration-500 rounded-t-md"
                        style={{ height: `${getBarHeight(compareDecibel)}%` }}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-sm font-medium">{compareDecibel} dB</div>
                        <div className="text-xs text-muted-foreground">
                          {formatScientificNotation(compareIntensity)} W/m²
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Animated Demonstration */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Play className="h-6 w-6 text-accent" />
                Logarithmic Scale Animation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button 
                  onClick={startAnimation}
                  disabled={isAnimating}
                  className="bg-accent hover:bg-accent/80"
                >
                  {isAnimating ? "Animating..." : "Show 10 dB Rule"}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Watch how energy increases exponentially with each 10 dB step
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {demoValues.map((demo, index) => (
                  <Card 
                    key={index}
                    className={`transition-all duration-500 ${
                      animationStep >= index 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 scale-105' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">
                        <div className="text-lg font-bold text-primary">{demo.db} dB</div>
                      </div>
                      
                      {/* Energy blocks visualization */}
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Energy blocks:</div>
                        <div className="grid grid-cols-4 gap-1">
                          {Array.from({ length: Math.min(getEnergyBlocks(demo.db), 16) }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-sm transition-all duration-300 ${
                                animationStep >= index 
                                  ? 'bg-green-500 scale-110' 
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {getEnergyBlocks(demo.db) > 16 && (
                          <div className="text-xs text-muted-foreground">
                            +{getEnergyBlocks(demo.db) - 16} more...
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <Badge className={`text-xs ${
                          animationStep >= index 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index === 0 ? 'Base' : `${Math.pow(10, index)}× energy`}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Key Insight</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    The logarithmic scale compresses the enormous range of sound intensities into manageable numbers. 
                    A 2 dB increase represents about 58% more energy, while 10 dB represents 10× more energy!
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2 className="h-6 w-6 text-purple-600" />
                Quick Reference: Common Differences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { diff: 1, ratio: 1.26, desc: "Just noticeable" },
                  { diff: 3, ratio: 2.0, desc: "Clearly audible" },
                  { diff: 6, ratio: 4.0, desc: "Significant change" },
                  { diff: 10, ratio: 10.0, desc: "Perceived as 2× louder" }
                ].map((item, index) => (
                  <Card key={index} className="bg-purple-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">+{item.diff} dB</div>
                      <div className="text-sm font-medium text-purple-800">{item.ratio}× energy</div>
                      <div className="text-xs text-purple-600 mt-1">{item.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}