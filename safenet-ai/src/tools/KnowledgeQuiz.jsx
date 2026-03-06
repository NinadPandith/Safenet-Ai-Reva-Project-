import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';

const KnowledgeQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const questions = [
        {
            question: "What is the primary goal of a 'Phishing' attack?",
            options: [
                "To infect a computer with a virus.",
                "To trick a user into revealing sensitive information like passwords.",
                "To break through a network firewall.",
                "To intercept data over a public Wi-Fi network."
            ],
            correct: 1,
            explanation: "Phishing uses deceptive emails or websites to trick users into handing over credentials or personal data voluntarily."
        },
        {
            question: "What does the 'S' in HTTPS stand for?",
            options: [
                "Standard",
                "Systematic",
                "Secure",
                "Synchronized"
            ],
            correct: 2,
            explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts the communication between your browser and the website, protecting data in transit."
        },
        {
            question: "Why is Two-Factor Authentication (2FA) important?",
            options: [
                "It prevents all malware infections.",
                "It requires a second piece of evidence (like a code from your phone) even if a password is stolen.",
                "It encrypts your hard drive.",
                "It hides your IP address from websites."
            ],
            correct: 1,
            explanation: "2FA mitigates the risk of compromised passwords by requiring physical possession of a secondary device (like a phone) to log in."
        },
        {
            question: "What is 'Ransomware'?",
            options: [
                "Software that displays unwanted advertisements.",
                "A program that records your keystrokes.",
                "Malware that encrypts your files and demands payment for the decryption key.",
                "A tool used to crack simple passwords."
            ],
            correct: 2,
            explanation: "Ransomware holds your data hostage by encrypting it, rendering it inaccessible until a ransom is paid (which is not guaranteed to work)."
        },
        {
            question: "Which of these is a characteristic of a strong password?",
            options: [
                "Using your pet's name followed by '123'.",
                "A short word that is easy to remember.",
                "A mix of uppercase, lowercase, numbers, symbols, and at least 12 characters long.",
                "Reusing the same password across multiple secure sites."
            ],
            correct: 2,
            explanation: "A strong password (or passphrase) is long and complex, making it resistant to automated brute-force and dictionary attacks."
        }
    ];

    const handleAnswer = (index) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
        setShowExplanation(true);

        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuizFinished(false);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <BookOpen className="text-[#2563EB]" size={32} />
                    Security Knowledge Quiz
                </h1>
                <p className="text-white/70 mt-2">
                    Test your cybersecurity awareness and learn essential concepts to protect yourself online.
                </p>
            </header>

            {!quizFinished ? (
                <div className="glass-card p-8">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            Score: {score}
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-3 mb-8">
                        {questions[currentQuestion].options.map((option, index) => {
                            let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";

                            if (!showExplanation) {
                                btnClass += "bg-transparent border-[#334155] hover:border-blue-500 hover:bg-[#1E293B] text-white";
                            } else {
                                if (index === questions[currentQuestion].correct) {
                                    btnClass += "bg-[#22C55E]/10 border-green-500 text-green-400 relative overflow-hidden";
                                } else if (index === selectedAnswer) {
                                    btnClass += "bg-[#EF4444]/10 border-red-500 text-red-400";
                                } else {
                                    btnClass += "bg-transparent border-slate-800 text-white/50 opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={showExplanation}
                                    className={btnClass}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{option}</span>
                                        {showExplanation && index === questions[currentQuestion].correct && (
                                            <CheckCircle size={20} className="text-[#22C55E] ml-2 shrink-0" />
                                        )}
                                        {showExplanation && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                                            <XCircle size={20} className="text-[#EF4444] ml-2 shrink-0" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {showExplanation && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className={`p-4 rounded-lg mb-6 border ${selectedAnswer === questions[currentQuestion].correct
                                    ? 'bg-[#22C55E]/10 border-green-500/30 text-green-300'
                                    : 'bg-transparent border-[#334155] text-white'
                                }`}>
                                <h4 className="font-semibold mb-1 flex items-center gap-2">
                                    {selectedAnswer === questions[currentQuestion].correct ? 'Correct!' : 'Explanation:'}
                                </h4>
                                <p className="text-sm opacity-90 leading-relaxed text-white">
                                    {questions[currentQuestion].explanation}
                                </p>
                            </div>

                            <button
                                onClick={nextQuestion}
                                className="w-full py-3 glass-btn-primary flex items-center justify-center gap-2"
                            >
                                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="glass-card p-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/20">
                            <Award size={64} className="text-[#2563EB]" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed</h2>
                    <p className="text-white/70 mb-8">Let's see how much you know about cybersecurity.</p>

                    <div className="flex items-end justify-center gap-2 mb-8">
                        <span className={`text-6xl font-bold ${score >= 4 ? 'text-[#22C55E]' : score >= 2 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                            {score}
                        </span>
                        <span className="text-2xl text-white/50 mb-1 lg:mb-2">/ {questions.length}</span>
                    </div>

                    <div className="p-4 bg-transparent rounded-lg border border-[#334155] mb-8 text-left">
                        <h4 className="font-semibold text-white mb-2">Security Advice</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {score === 5 ? "Excellent! You have a solid understanding of core cybersecurity principles. Keep practicing good digital hygiene." :
                                score >= 3 ? "Good job. You know the basics, but there are a few areas you can brush up on to fully protect your digital identity." :
                                    "There's room for improvement. We recommend reviewing basic security practices to avoid falling victim to common social engineering and malware attacks."}
                        </p>
                    </div>

                    <button
                        onClick={restartQuiz}
                        className="px-8 py-3 bg-[#334155] hover:bg-[#475569] text-white font-medium rounded-lg transition-colors"
                    >
                        Retake Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default KnowledgeQuiz;
