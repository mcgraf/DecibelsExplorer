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
    { db: 10, label: "10 dB", energyMultiplier: 1, description: "Starting point" },
    { db: 20, label: "20 dB", energyMultiplier: 10, description: "10× more energy" },
    { db: 30, label: "30 dB", energyMultiplier: 100, description: "100× more energy" },
    { db: 40, label: "40 dB", energyMultiplier: 1000, description: "1,000× more energy" },
    { db: 50, label: "50 dB", energyMultiplier: 10000, description: "10,000× more energy" }
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

  // Calculate bar heights for visualization (improved scaling)
  const getBarHeight = (decibel: number) => {
    // Use a more intuitive scaling where each 10 dB roughly doubles the visual height
    const minHeight = 20; // Minimum height for visibility
    const maxHeight = 180; // Maximum height for the container
    const heightRange = maxHeight - minHeight;
    
    // Logarithmic scaling that makes differences more visible
    const scaledHeight = (decibel / 80) * heightRange;
    return Math.max(minHeight, Math.min(scaledHeight + minHeight, maxHeight));
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
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-6 text-center text-lg">Energy Intensity Comparison</h4>
                  <div className="flex items-end justify-center space-x-12 h-56 mb-4 relative">
                    {/* Grid lines for reference */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[25, 50, 75].map((percentage) => (
                        <div
                          key={percentage}
                          className="absolute w-full border-t border-gray-200 border-dashed"
                          style={{ bottom: `${percentage}%` }}
                        />
                      ))}
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10">
                      <div className="relative">
                        <div 
                          className="w-20 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 transition-all duration-700 rounded-t-lg shadow-lg border-2 border-blue-700 relative overflow-hidden"
                          style={{ height: `${getBarHeight(baseDecibel)}px` }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                        </div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                          {formatScientificNotation(baseIntensity)} W/m²
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-lg font-bold text-blue-600">{baseDecibel} dB</div>
                        <div className="text-sm text-muted-foreground">Base Level</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center h-full relative z-10">
                      <div className="bg-white rounded-full p-4 shadow-lg border-2 border-gray-300 relative">
                        <div className="text-2xl font-bold text-primary">
                          {energyRatio.toFixed(1)}×
                        </div>
                        {/* Pulsing ring effect */}
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 font-medium">energy ratio</div>
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10">
                      <div className="relative">
                        <div 
                          className="w-20 bg-gradient-to-t from-orange-600 via-orange-500 to-orange-400 transition-all duration-700 rounded-t-lg shadow-lg border-2 border-orange-700 relative overflow-hidden"
                          style={{ height: `${getBarHeight(compareDecibel)}px` }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                        </div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                          {formatScientificNotation(compareIntensity)} W/m²
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-lg font-bold text-orange-600">{compareDecibel} dB</div>
                        <div className="text-sm text-muted-foreground">Compare Level</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced visual explanation */}
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-t from-blue-600 to-blue-400 rounded"></div>
                        <span>Base: {baseDecibel} dB</span>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-t from-orange-600 to-orange-400 rounded"></div>
                        <span>Compare: {compareDecibel} dB</span>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="font-semibold text-primary">
                        {energyRatio.toFixed(1)}× more energy
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
                The 10 dB Rule: Energy Multiplication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button 
                  onClick={startAnimation}
                  disabled={isAnimating}
                  className="bg-accent hover:bg-accent/80"
                >
                  {isAnimating ? "Playing Animation..." : "Show 10 dB Rule"}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Watch how energy multiplies by 10 with each 10 dB increase
                </p>
              </div>

              {/* Current Animation Step Display */}
              {isAnimating && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-blue-800">
                      {animationStep === 0 ? "Starting at 10 dB" : 
                       `${demoValues[animationStep].db} dB = ${demoValues[animationStep].energyMultiplier}× the energy of 10 dB`}
                    </div>
                    <div className="text-sm text-blue-600 mt-1">
                      {demoValues[animationStep].description}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {demoValues.map((demo, index) => (
                  <Card 
                    key={index}
                    className={`transition-all duration-1000 ${
                      animationStep >= index 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 scale-105 shadow-lg' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">
                        <div className={`text-xl font-bold transition-colors duration-500 ${
                          animationStep >= index ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {demo.db} dB
                        </div>
                      </div>
                      
                      {/* Energy multiplier display */}
                      <div className="mb-3">
                        <div className={`text-lg font-semibold transition-colors duration-500 ${
                          animationStep >= index ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {demo.energyMultiplier}×
                        </div>
                        <div className="text-xs text-muted-foreground">energy</div>
                      </div>
                      
                      {/* Visual energy representation */}
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Energy level:</div>
                        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 rounded-full ${
                              animationStep >= index 
                                ? 'bg-gradient-to-r from-green-400 to-green-600' 
                                : 'bg-gray-300'
                            }`}
                            style={{ 
                              width: `${Math.min((Math.log10(demo.energyMultiplier) + 1) * 25, 100)}%`,
                              transform: animationStep >= index ? 'scaleX(1)' : 'scaleX(0)',
                              transformOrigin: 'left'
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Badge className={`text-xs transition-colors duration-500 ${
                          animationStep >= index 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index === 0 ? 'Base level' : `${demo.energyMultiplier}× more`}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Rule explanation */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">The 10 dB Rule</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Every 10 dB increase = 10× more energy<br/>
                      20 dB vs 10 dB = 10× more energy<br/>
                      30 dB vs 20 dB = 10× more energy<br/>
                      40 dB vs 30 dB = 10× more energy
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Why This Matters</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      This exponential growth means small dB increases represent huge energy changes. 
                      A 40 dB sound has 1,000× more energy than a 10 dB sound!
                    </p>
                  </CardContent>
                </Card>
              </div>
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