import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const tabs = ['React', 'TypeScript', 'CSS'] as const
type Tab = typeof tabs[number]

const codeSnippets: Record<Tab, { lines: { tokens: { text: string; color: string }[] }[] }> = {
  React: {
    lines: [
      { tokens: [{ text: 'import ', color: 'text-purple-400' }, { text: '{ Button, Card }', color: 'text-cyan-300' }, { text: ' from ', color: 'text-purple-400' }, { text: "'modernui'", color: 'text-green-400' }] },
      { tokens: [] },
      { tokens: [{ text: 'export default ', color: 'text-purple-400' }, { text: 'function', color: 'text-yellow-300' }, { text: ' ', color: '' }, { text: 'MyComponent', color: 'text-cyan-300' }, { text: '() {', color: 'text-gray-300' }] },
      { tokens: [{ text: '  return (', color: 'text-gray-300' }] },
      { tokens: [{ text: '    <', color: 'text-gray-400' }, { text: 'Card', color: 'text-pink-400' }, { text: ' className=', color: 'text-gray-300' }, { text: '"glass rounded-xl"', color: 'text-orange-300' }, { text: '>', color: 'text-gray-400' }] },
      { tokens: [{ text: '      <', color: 'text-gray-400' }, { text: 'Button', color: 'text-pink-400' }, { text: ' variant=', color: 'text-gray-300' }, { text: '"gradient"', color: 'text-orange-300' }, { text: '>', color: 'text-gray-400' }] },
      { tokens: [{ text: '        Get Started', color: 'text-gray-300' }] },
      { tokens: [{ text: '      </', color: 'text-gray-400' }, { text: 'Button', color: 'text-pink-400' }, { text: '>', color: 'text-gray-400' }] },
      { tokens: [{ text: '    </', color: 'text-gray-400' }, { text: 'Card', color: 'text-pink-400' }, { text: '>', color: 'text-gray-400' }] },
      { tokens: [{ text: '  )', color: 'text-gray-300' }] },
      { tokens: [{ text: '}', color: 'text-gray-300' }] },
    ],
  },
  TypeScript: {
    lines: [
      { tokens: [{ text: 'interface ', color: 'text-yellow-300' }, { text: 'ButtonProps', color: 'text-cyan-300' }, { text: ' {', color: 'text-gray-300' }] },
      { tokens: [{ text: '  variant: ', color: 'text-green-300' }, { text: "'default' | 'gradient' | 'outline'", color: 'text-orange-300' }] },
      { tokens: [{ text: '  size?:', color: 'text-green-300' }, { text: ' ', color: '' }, { text: "'sm' | 'md' | 'lg'", color: 'text-orange-300' }] },
      { tokens: [{ text: '  children:', color: 'text-green-300' }, { text: ' React', color: 'text-cyan-300' }, { text: '.ReactNode', color: 'text-blue-300' }] },
      { tokens: [{ text: '  onClick?:', color: 'text-green-300' }, { text: ' () => ', color: 'text-gray-300' }, { text: 'void', color: 'text-purple-400' }] },
      { tokens: [{ text: '}', color: 'text-gray-300' }] },
      { tokens: [] },
      { tokens: [{ text: 'const ', color: 'text-purple-400' }, { text: 'Button', color: 'text-cyan-300' }, { text: ': React.FC<', color: 'text-gray-300' }, { text: 'ButtonProps', color: 'text-cyan-300' }, { text: '> = ({', color: 'text-gray-300' }] },
      { tokens: [{ text: '  variant,', color: 'text-green-300' }, { text: ' size = ', color: 'text-gray-300' }, { text: "'md'", color: 'text-orange-300' }, { text: ',', color: 'text-gray-300' }] },
      { tokens: [{ text: '  children, onClick', color: 'text-green-300' }] },
      { tokens: [{ text: '}) => (', color: 'text-gray-300' }] },
    ],
  },
  CSS: {
    lines: [
      { tokens: [{ text: '.glass', color: 'text-cyan-300' }, { text: ' {', color: 'text-gray-300' }] },
      { tokens: [{ text: '  background: ', color: 'text-green-300' }, { text: 'rgba(255, 255, 255, 0.05)', color: 'text-orange-300' }, { text: ';', color: 'text-gray-400' }] },
      { tokens: [{ text: '  backdrop-filter: ', color: 'text-green-300' }, { text: 'blur(10px)', color: 'text-orange-300' }, { text: ';', color: 'text-gray-400' }] },
      { tokens: [{ text: '  border: ', color: 'text-green-300' }, { text: '1px solid rgba(255, 255, 255, 0.1)', color: 'text-orange-300' }, { text: ';', color: 'text-gray-400' }] },
      { tokens: [{ text: '}', color: 'text-gray-300' }] },
      { tokens: [] },
      { tokens: [{ text: '.gradient-text', color: 'text-cyan-300' }, { text: ' {', color: 'text-gray-300' }] },
      { tokens: [{ text: '  background: ', color: 'text-green-300' }, { text: 'linear-gradient(135deg,', color: 'text-orange-300' }] },
      { tokens: [{ text: '    #667eea 0%, #764ba2 50%,', color: 'text-purple-300' }] },
      { tokens: [{ text: '    #f64f59 100%', color: 'text-pink-300' }, { text: ');', color: 'text-gray-400' }] },
      { tokens: [{ text: '  -webkit-background-clip: ', color: 'text-green-300' }, { text: 'text', color: 'text-orange-300' }, { text: ';', color: 'text-gray-400' }] },
      { tokens: [{ text: '}', color: 'text-gray-300' }] },
    ],
  },
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState<Tab>('React')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = codeSnippets[activeTab].lines
      .map((line) => line.tokens.map((t) => t.text).join(''))
      .join('\n')
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="demo" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            Interactive Demo
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Clean, <span className="gradient-text">Elegant</span> Code
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Write beautiful, maintainable code with our intuitive API and comprehensive documentation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white glass transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="p-6 font-mono text-sm overflow-x-auto bg-gray-950/50">
              {codeSnippets[activeTab].lines.map((line, i) => (
                <div key={i} className="flex items-start min-h-[1.5rem]">
                  <span className="w-8 text-gray-600 select-none text-right pr-4 text-xs leading-6">{i + 1}</span>
                  <span className="leading-6">
                    {line.tokens.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      line.tokens.map((token, j) => (
                        <span key={j} className={token.color}>{token.text}</span>
                      ))
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
