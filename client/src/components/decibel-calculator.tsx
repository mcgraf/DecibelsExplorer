import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap } from "lucide-react";
import { calculateDecibelFromIntensity, calculateEnergyRatio, formatScientificNotation } from "@/lib/decibel-utils";

export function DecibelCalculator() {
  const [intensity, setIntensity] = useState<string>("");
  const [referenceIntensity, setReferenceIntensity] = useState<string>("1e-12");
  const [calculatedDecibels, setCalculatedDecibels] = useState<number | null>(null);
  
  const [soundLevel1, setSoundLevel1] = useState<string>("");
  const [soundLevel2, setSoundLevel2] = useState<string>("");
  const [energyRatio, setEnergyRatio] = useState<number | null>(null);
  const [powerDifference, setPowerDifference] = useState<number | null>(null);

  const calculateDecibels = () => {
    const intensityValue = parseFloat(intensity);
    const referenceValue = parseFloat(referenceIntensity);
    
    if (isNaN(intensityValue) || isNaN(referenceValue) || intensityValue <= 0 || referenceValue <= 0) {
      setCalculatedDecibels(null);
      return;
    }
    
    const result = calculateDecibelFromIntensity(intensityValue, referenceValue);
    setCalculatedDecibels(result);
  };

  const compareEnergy = () => {
    const level1 = parseFloat(soundLevel1);
    const level2 = parseFloat(soundLevel2);
    
    if (isNaN(level1) || isNaN(level2)) {
      setEnergyRatio(null);
      setPowerDifference(null);
      return;
    }
    
    const ratio = calculateEnergyRatio(level1, level2);
    setEnergyRatio(ratio);
    
    const intensity1 = Math.pow(10, level1 / 10) * 1e-12;
    const intensity2 = Math.pow(10, level2 / 10) * 1e-12;
    setPowerDifference(Math.abs(intensity1 - intensity2));
  };

  return (
    <section id="calculator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
          Decibel Calculator
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sound Level Calculator */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  Sound Level Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="intensity">Sound Intensity (W/m²):</Label>
                  <Input
                    id="intensity"
                    type="number"
                    placeholder="Enter intensity value"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    step="any"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Intensity:</Label>
                  <Select value={referenceIntensity} onValueChange={setReferenceIntensity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1e-12">1 × 10⁻¹² W/m² (Threshold of hearing)</SelectItem>
                      <SelectItem value="1e-16">1 × 10⁻¹⁶ W/m² (Theoretical minimum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-primary mb-2">Result:</h4>
                    <div className="text-2xl font-bold text-primary">
                      {calculatedDecibels !== null ? `${calculatedDecibels.toFixed(1)} dB` : "-- dB"}
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={calculateDecibels}
                  className="w-full"
                  disabled={!intensity || !referenceIntensity}
                >
                  Calculate Decibels
                </Button>
              </CardContent>
            </Card>

            {/* Energy Comparison Calculator */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-accent" />
                  Energy Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level1">Sound Level 1:</Label>
                    <Input
                      id="level1"
                      type="number"
                      placeholder="dB"
                      value={soundLevel1}
                      onChange={(e) => setSoundLevel1(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level2">Sound Level 2:</Label>
                    <Input
                      id="level2"
                      type="number"
                      placeholder="dB"
                      value={soundLevel2}
                      onChange={(e) => setSoundLevel2(e.target.value)}
                    />
                  </div>
                </div>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-secondary mb-2">Energy Ratio:</h4>
                    <div className="text-2xl font-bold text-secondary">
                      {energyRatio !== null ? `${energyRatio.toFixed(1)}×` : "--"}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Times more energy</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Power Difference:</h4>
                    <div className="text-lg font-mono">
                      {powerDifference !== null ? `${formatScientificNotation(powerDifference)} W/m²` : "-- W/m²"}
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={compareEnergy}
                  className="w-full bg-secondary hover:bg-secondary/80"
                  disabled={!soundLevel1 || !soundLevel2}
                >
                  Compare Energy Levels
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Formula Reference */}
          <Card className="mt-8 gradient-purple border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Key Formulas</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2">Sound Level</h4>
                    <div className="font-mono text-xs">dB = 10 × log₁₀(I/I₀)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2">Intensity Ratio</h4>
                    <div className="font-mono text-xs">I₁/I₂ = 10^(ΔdB/10)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2">Power Density</h4>
                    <div className="font-mono text-xs">P = I × A</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
