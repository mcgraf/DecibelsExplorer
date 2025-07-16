import { Navigation } from "@/components/navigation";
import { DecibelVisualization } from "@/components/decibel-visualization";
import { DecibelScale } from "@/components/decibel-scale";
import { DecibelCalculator } from "@/components/decibel-calculator";
import { InteractiveExercises } from "@/components/interactive-exercises";
import { ExtremeCalculator } from "@/components/extreme-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Github, Twitter, Mail } from "lucide-react";

export default function Home() {
  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Master the Decibel Scale
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Learn how sound intensity is measured using the logarithmic decibel scale. 
            Explore real-world examples, interactive calculators, and extreme scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/80 text-accent-foreground"
              onClick={() => handleScrollTo('basics')}
            >
              Start Learning
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 font-semibold"
              onClick={() => handleScrollTo('calculator')}
            >
              Quick Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Basics Section */}
      <section id="basics" className="py-16 bg-white" aria-labelledby="basics-heading">
        <div className="container mx-auto px-4">
          <h2 id="basics-heading" className="text-3xl font-bold text-center mb-12 text-neutral">
            Understanding Decibels: The Logarithmic Scale
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-6 w-6 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">What Are Decibels?</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Decibels (dB) are a logarithmic unit used to measure sound intensity and power ratios. 
                  Unlike linear scales, each 10 dB increase represents a 10-fold increase in sound energy, 
                  making it perfect for measuring the vast range of human hearing from whispers to jet engines.
                </p>
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-primary mb-2">Key Formula:</h4>
                    <p className="font-mono text-sm">dB = 10 × log₁₀(I/I₀)</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Where I₀ is the reference intensity
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary mr-3" />
                  <h3 className="text-xl font-semibold">Why Logarithmic?</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Human hearing perceives sound logarithmically. A linear scale would be impractical 
                  for the enormous range of sound intensities we can hear.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Whisper</span>
                    <Badge className="bg-green-100 text-green-800">0 dB</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Normal Speech</span>
                    <Badge className="bg-blue-100 text-blue-800">60 dB</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Jet Engine</span>
                    <Badge className="bg-red-100 text-red-800">140 dB</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="gradient-surface border-0">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Energy vs. Decibels
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary">+10 dB</div>
                      <div className="text-sm text-muted-foreground mt-1">10× Energy</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-secondary">+20 dB</div>
                      <div className="text-sm text-muted-foreground mt-1">100× Energy</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-accent">+30 dB</div>
                      <div className="text-sm text-muted-foreground mt-1">1,000× Energy</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Components */}
      <section id="visualization" aria-labelledby="visualization-heading">
        <h2 id="visualization-heading" className="sr-only">Decibel Visualization and Learning Tools</h2>
        <DecibelVisualization />
      </section>
      
      <section id="scale" aria-labelledby="scale-heading">
        <h2 id="scale-heading" className="sr-only">Interactive Decibel Scale with Real-World Examples</h2>
        <DecibelScale />
      </section>
      
      <section id="calculator" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="sr-only">Decibel Calculator and Energy Conversion Tools</h2>
        <DecibelCalculator />
      </section>
      
      <section id="exercises" aria-labelledby="exercises-heading">
        <h2 id="exercises-heading" className="sr-only">Interactive Decibel Learning Exercises and Quizzes</h2>
        <InteractiveExercises />
      </section>
      
      <section id="extreme" aria-labelledby="extreme-heading">
        <h2 id="extreme-heading" className="sr-only">Extreme Decibel Calculator for Cosmic-Level Scenarios</h2>
        <ExtremeCalculator />
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Learn More</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Acoustic Physics</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Hearing Protection</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Sound Engineering</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Logarithmic Functions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => handleScrollTo('visualization')} className="hover:text-blue-300 transition-colors">Visual Comparison</button></li>
                <li><button onClick={() => handleScrollTo('calculator')} className="hover:text-blue-300 transition-colors">dB Calculator</button></li>
                <li><button onClick={() => handleScrollTo('scale')} className="hover:text-blue-300 transition-colors">Interactive Scale</button></li>
                <li><button onClick={() => handleScrollTo('exercises')} className="hover:text-blue-300 transition-colors">Practice Exercises</button></li>
                <li><button onClick={() => handleScrollTo('extreme')} className="hover:text-blue-300 transition-colors">Extreme Calculator</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Formula Reference</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Common Examples</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Scientific Papers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-sm text-gray-300 mb-4">
                An interactive educational tool for understanding the logarithmic nature of sound measurement.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Decibel Scale Learning App. Educational use only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
