import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export default function AICoachAssistant() {
    const { theme } = useTheme()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá! Sou seu assistente de IA. Posso ajudar com sugestões de treino, análise de atletas, formação de times e muito mais. Como posso ajudar hoje?',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const suggestions = [
        { icon: '💡', text: 'Sugerir treino para Sub-14', query: 'Sugira um plano de treino para equipe Sub-14' },
        { icon: '📊', text: 'Analisar desempenho', query: 'Como posso melhorar o desempenho dos atletas?' },
        { icon: '⚽', text: 'Formação tática', query: 'Qual a melhor formação tática para minha equipe?' },
        { icon: '🎯', text: 'Identificar talentos', query: 'Como identificar atletas com alto potencial?' }
    ]

    const generateAIResponse = async (userMessage: string): Promise<string> => {
        // Simulação de resposta da IA - integrar com API real posteriormente
        await new Promise(resolve => setTimeout(resolve, 1500))

        const responses: Record<string, string> = {
            'treino': `**Plano de Treino Sugerido:**

1. **Aquecimento (15min)**: Corrida leve + alongamento dinâmico
2. **Técnica Individual (25min)**: 
   - Controle de bola
   - Passes curtos e longos
   - Finalizações
3. **Tática (20min)**: Trabalho de posicionamento e movimentação
4. **Jogo Reduzido (20min)**: 7x7 com foco em transições
5. **Volta à Calma (10min)**: Alongamento estático

**Dica:** Varie os exercícios semanalmente para manter o engajamento.`,
            'desempenho': `**Estratégias para Melhorar Desempenho:**

📊 **Análise de Dados:**
- Registre métricas semanalmente
- Compare evolução individual
- Identifique pontos fracos

🎯 **Feedback Personalizado:**
- Avaliações individuais mensais
- Definir metas claras
- Reconhecer progressos

💪 **Preparação Física:**
- Treinos específicos por posição
- Trabalho de força e velocidade
- Prevenção de lesões`,
            'formação': `**Formações Táticas Recomendadas:**

⚽ **4-3-3 (Ofensivo)**
- Ideal para equipes técnicas
- Foco na posse de bola
- Pressão alta

🛡️ **4-4-2 (Equilibrado)**
- Boa defesa e ataque
- Fácil de ensinar
- Versatilidade tática

🎯 **3-5-2 (Domínio Meio-Campo)**
- Controle do jogo
- Suporte lateral
- Transições rápidas`,
            'talentos': `**Como Identificar Alto Potencial:**

🌟 **Técnico:**
- Domínio de bola acima da média
- Visão de jogo
- Criatividade

💪 **Físico:**
- Resistência
- Velocidade
- Coordenação motora

🧠 **Mental:**
- Disciplina
- Inteligência emocional
- Capacidade de aprendizado
- Liderança natural

📈 **Acompanhamento:**
- Avaliações regulares
- Feedback contínuo
- Desafios progressivos`
        }

        // Encontrar resposta mais relevante
        const lowerMessage = userMessage.toLowerCase()
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response
            }
        }

        // Resposta padrão
        return `Entendi sua pergunta sobre "${userMessage}". 

Como assistente de IA especializado em gestão esportiva, posso ajudar com:

🎯 **Planejamento de Treinos**
📊 **Análise de Desempenho**
⚽ **Estratégias Táticas**
👥 **Gestão de Equipe**
💡 **Desenvolvimento de Atletas**

Você pode me perguntar algo mais específico ou escolher uma das sugestões acima!`
    }

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const aiResponse = await generateAIResponse(input)

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('AI Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuggestionClick = (query: string) => {
        setInput(query)
    }

    return (
        <Card className="h-full flex flex-col">
            {/* Header */}
            <div className={`flex items-center gap-3 pb-4 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                </div>
                <div>
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                        ProCoach AI
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Seu treinador virtual inteligente
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-[300px] max-h-[500px]">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                ? theme === 'dark'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-primary-500 text-white'
                                : theme === 'dark'
                                    ? 'bg-neutral-900 text-neutral-100 border border-neutral-800'
                                    : 'bg-neutral-100 text-neutral-900'
                                }`}
                        >
                            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className={`px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-neutral-900 border border-neutral-800' : 'bg-neutral-100'}`}>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
                                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
                <div className="py-3 space-y-2">
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Sugestões rápidas:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {suggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion.query)}
                                className={`text-left text-xs px-3 py-2 rounded-lg transition-colors ${theme === 'dark'
                                    ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                    }`}
                            >
                                <span className="mr-1">{suggestion.icon}</span>
                                {suggestion.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className={`flex gap-2 pt-4 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Digite sua pergunta..."
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2 rounded-lg border ${theme === 'dark'
                        ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                        : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50`}
                />
                <Button
                    variant="primary"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
                >
                    {isLoading ? '...' : '→'}
                </Button>
            </div>
        </Card>
    )
}
