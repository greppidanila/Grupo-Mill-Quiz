'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, BarChart3, CheckCircle2, AlertCircle, TrendingUp, ArrowRight, RefreshCcw } from 'lucide-react';

// --- Configuration ---
const QUESTIONS = [
  {
    id: 1,
    text: "¿Tenés control mensual de los costos de tu empresa?",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 2,
    text: "¿Utilizás indicadores para tomar decisiones importantes?",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 3,
    text: "¿Tu información administrativa está digitalizada?",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    id: 4,
    text: "¿Contás con una planificación financiera anual?",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 5,
    text: "¿Dentro de tu equipo hay roles y funciones bien definidos?",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    id: 6,
    text: "¿Realizás seguimiento periódico de los resultados del negocio?",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 7,
    text: "¿Tenés objetivos claros de crecimiento para los próximos años?",
    icon: <ArrowRight className="w-6 h-6" />,
  },
  {
    id: 8,
    text: "¿Analizás regularmente la rentabilidad de tu negocio?",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

const RESULTS = {
  HIGH: {
    title: "Gestión en orden",
    message: "Tu empresa cuenta con herramientas básicas de gestión y planificación. Seguir profesionalizando los procesos puede ayudarte a crecer con mayor previsibilidad.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    icon: <CheckCircle2 className="w-16 h-16 text-emerald-500" />,
  },
  MEDIUM: {
    title: "Con oportunidades de mejora",
    message: "Hay aspectos de la gestión que podrían optimizarse para mejorar la organización interna, la planificación financiera o el análisis de resultados.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    icon: <TrendingUp className="w-16 h-16 text-amber-500" />,
  },
  LOW: {
    title: "Zona de alerta",
    message: "Existen oportunidades importantes para ordenar procesos, mejorar la información para tomar decisiones y fortalecer la estructura de gestión.",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    icon: <AlertCircle className="w-16 h-16 text-rose-500" />,
  },
};

// --- Components ---

export default function ExpoQuiz() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [phone, setPhone] = useState('');

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
  };

  const handleReset = () => {
    setStep('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setShowContactForm(false);
    setPhone('');
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const result = getResult();
    const message = `Hola Grupo Mill! 👋 Acabo de completar el Desafío de Gestión en la Expo Dinámica 2026. 
    
Mi resultado fue: *${result.title}* 📊

Me gustaría conversar sobre mi empresa. Mi contacto es: ${phone}`;
    
    const encodedMessage = encodeURIComponent(message);
    // Reemplazar con el número real de la empresa
    const whatsappUrl = `https://wa.me/5491112345678?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((acc, curr) => acc + curr, 0);
      setScore(totalScore);
      setStep('result');
    }
  };

  const getResult = () => {
    const maxScore = QUESTIONS.length * 2;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) return RESULTS.HIGH;
    if (percentage >= 40) return RESULTS.MEDIUM;
    return RESULTS.LOW;
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50" />
      </div>

      <main className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-slate-100 min-h-[600px] flex flex-col">
        
        {/* Header / Logo */}
        <div className="p-6 flex justify-center border-bottom border-slate-50">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
              <div className="text-xl font-bold tracking-tighter text-blue-900">GRUPO MILL</div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col p-8 text-center"
            >
              <div className="flex-1 flex flex-col justify-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 inline-block mx-auto p-4 bg-blue-50 rounded-2xl text-blue-600"
                >
                  <BarChart3 className="w-12 h-12" />
                </motion.div>
                <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                  Desafío de Gestión Empresarial
                </h1>
                <h2 className="text-lg font-medium text-blue-600 mb-6">
                  Descubrí en 1 minuto cómo está la gestión de tu empresa.
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  Respondé unas preguntas rápidas y obtené un diagnóstico simple sobre la organización y gestión de tu negocio.
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                Comenzar desafío
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="mt-6 text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Expo Dinámica 2026
              </p>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6"
            >
              {/* Header with Back Button */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={handleReset}
                  className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <RefreshCcw className="w-3 h-3" />
                  VOLVER AL INICIO
                </button>
                <span className="text-xs font-black text-blue-900/20 tracking-widest">EXPO 2026</span>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Pregunta {currentQuestion + 1} de {QUESTIONS.length}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {Math.round(((currentQuestion) / QUESTIONS.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-8"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                      {QUESTIONS[currentQuestion].icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 leading-snug">
                      {QUESTIONS[currentQuestion].text}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                {/* Options */}
                <div className="space-y-3">
                  {[
                    { label: 'Sí', value: 2, color: 'hover:border-emerald-500 hover:bg-emerald-50 active:bg-emerald-100' },
                    { label: 'Parcialmente', value: 1, color: 'hover:border-amber-500 hover:bg-amber-50 active:bg-amber-100' },
                    { label: 'No', value: 0, color: 'hover:border-rose-500 hover:bg-rose-50 active:bg-rose-100' }
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(opt.value)}
                      className={`w-full p-5 bg-white border-2 border-slate-100 rounded-2xl text-left font-bold text-slate-700 transition-all flex items-center justify-between group ${opt.color}`}
                    >
                      {opt.label}
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-current flex items-center justify-center">
                        <div className="w-2 h-2 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col p-8 text-center"
            >
              <div className="flex-1 flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="mb-6 mx-auto"
                >
                  {result.icon}
                </motion.div>
                
                <h2 className={`text-2xl font-black mb-4 ${result.color}`}>
                  {result.title}
                </h2>
                
                <div className={`p-6 rounded-3xl mb-8 ${result.bgColor}`}>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {result.message}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {!showContactForm ? (
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      Hablemos sobre tu empresa
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleWhatsAppRedirect}
                      className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3"
                    >
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Ingresá tu WhatsApp para contactarte</p>
                      <input 
                        type="tel" 
                        placeholder="Ej: +54 9 11 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none font-medium text-center"
                      />
                      <button
                        type="submit"
                        className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        Enviar y chatear
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.form>
                  )}
                  
                  <button
                    onClick={handleReset}
                    className="w-full py-5 bg-white border-2 border-slate-100 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Volver al inicio
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-slate-400 text-sm leading-relaxed italic">
                  &quot;Cada empresa tiene su propia realidad. En Grupo Mill acompañamos a las empresas a ordenar su gestión, tomar mejores decisiones y crecer con una base sólida.&quot;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Branding */}
        <div className="p-4 bg-slate-50 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            Estrategia | Creatividad | Gestión
          </p>
        </div>
      </main>

      {/* Mobile-only hint */}
      <div className="mt-8 text-slate-400 text-sm font-medium flex items-center gap-2 animate-pulse">
        <span>Optimizado para dispositivos móviles</span>
      </div>
    </div>
  );
}
