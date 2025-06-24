'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Code, Clock, Brain, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ApiResponse {
  runtime: string;
  reasoning: string;
  status: 'success' | 'error';
}

export default function Home() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Dummy API call simulation
  const analyzeCode = async (codeInput: string): Promise<ApiResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Dummy responses based on code content
    const responses: ApiResponse[] = [
      {
        runtime: 'O(n)',
        reasoning: 'Linear time complexity due to single loop iteration through input array',
        status: 'success'
      },
      {
        runtime: 'O(n²)',
        reasoning: 'Quadratic time due to nested loops processing each element against every other element',
        status: 'success'
      },
      {
        runtime: 'O(log n)',
        reasoning: 'Logarithmic complexity from binary search or divide-and-conquer approach',
        status: 'success'
      },
      {
        runtime: 'O(1)',
        reasoning: 'Constant time operation with direct access or simple arithmetic',
        status: 'success'
      }
    ];

    // Return random response or error based on code length
    if (codeInput.length < 10) {
      return {
        runtime: 'Error',
        reasoning: 'Code snippet too short for meaningful analysis',
        status: 'error'
      };
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast.error('Please enter some code to analyze');
      return;
    }

    setIsLoading(true);
    setHasSubmitted(true);

    try {
      const newResult = await analyzeCode(code);
      setResult(newResult);
      
      if (newResult.status === 'success') {
        toast.success('Code analyzed successfully!');
      } else {
        toast.error('Analysis completed with warnings');
      }
    } catch (error) {
      toast.error('Failed to analyze code. Please try again.');
      setResult({
        runtime: 'Error',
        reasoning: 'Network error or service unavailable',
        status: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setHasSubmitted(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert tab character at cursor position
      const newValue = code.substring(0, start) + '\t' + code.substring(end);
      setCode(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 justify-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Avik's Runtime Calculator
            </h1>
          </div>
          <p className="text-slate-600 text-center mt-2 max-w-2xl mx-auto">
            Analyze your code's time complexity with intelligent reasoning and detailed explanations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Input Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Code className="h-5 w-5 text-blue-600" />
                  Code Input
                </CardTitle>
                <CardDescription>
                  Paste your code snippet below for runtime complexity analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="// Paste your code here...
function exampleFunction(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}"
                      className="min-h-[200px] font-mono text-sm bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-y"
                      disabled={isLoading}
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{code.length} characters</span>
                      <span>Press Tab to indent • Supports multiple programming languages</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      disabled={isLoading || !code.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          Analyze Runtime
                        </>
                      )}
                    </Button>
                    
                    {result && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={clearResults}
                        disabled={isLoading}
                        className="border-slate-300 hover:bg-slate-50"
                      >
                        Clear Results
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Analysis Info */}
            <Card className="shadow-md border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-900">How it works</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Our advanced algorithm analyzes your code structure, loops, recursive calls, and data access patterns 
                      to determine the most likely time complexity and provide detailed reasoning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {hasSubmitted && (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Runtime complexity analysis with detailed explanations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!result && !isLoading ? (
                    <div className="text-center py-8 text-slate-500">
                      <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No results yet. Submit your code for analysis.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {isLoading && (
                        <div className="flex items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                          <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-600" />
                            <p className="text-slate-600 font-medium">Analyzing your code...</p>
                            <p className="text-sm text-slate-500">This may take a few seconds</p>
                          </div>
                        </div>
                      )}
                      
                      {result && (
                        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <Table>
                            <TableHeader className="bg-slate-50">
                              <TableRow>
                                <TableHead className="font-semibold text-slate-700">Runtime Complexity</TableHead>
                                <TableHead className="font-semibold text-slate-700">Reasoning</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    {result.status === 'success' ? (
                                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                                        {result.runtime}
                                      </Badge>
                                    ) : (
                                      <Badge variant="destructive" className="flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {result.runtime}
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-700 leading-relaxed">
                                  {result.reasoning}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!hasSubmitted && (
              <Card className="shadow-md border-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Ready to Analyze</h3>
                    <p className="text-sm text-slate-600">
                      Enter your code and click "Analyze Runtime" to see detailed complexity analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600 text-sm">
            <p>© 2025 Avik's Runtime Calculator. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}