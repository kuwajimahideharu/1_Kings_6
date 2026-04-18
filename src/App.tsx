/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
  Hammer, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Construction,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Chapter sections
const sections = [
  {
    id: 'overview',
    title: '概観 (Summary)',
    icon: <BookOpen className="w-5 h-5" />,
    content: `
      列王記第一 第6章は、ソロモン王によるイェルサレム神殿の建設について詳細に記述しています。
      出エジプトから480年後、ソロモンの治世第4年に建設が始まりました。
      神殿の寸法（長さ60キュビト、幅20キュビト、高さ30キュビト）や、窓、脇部屋の構造などが記録されています。
    `
  },
  {
    id: 'construction',
    title: '「静かな」建設 (Process)',
    icon: <Hammer className="w-5 h-5" />,
    content: `
      特徴的なのは、建設現場で鉄の道具の音が一切しなかったことです。
      石材は切り出し場で完璧に仕上げられ、現場では組み立てるだけでした（6:7）。
      これは、神聖な場所における秩序と徹底した準備を象徴しています。
    `
  },
  {
    id: 'inner',
    title: '至聖所と装飾 (Beauty)',
    icon: <Sparkles className="w-5 h-5" />,
    content: `
      神殿の内部はレバノン杉で覆われ、その上から純金が惜しみなく張られました。
      オリーブの木で作られた巨大な二体のケルビムが翼を広げ、至聖所を護っています。
      目に見えない部分にまで最高の素材と技術が注ぎ込まれました。
    `
  },
  {
    id: 'covenant',
    title: '神の約束 (Promise)',
    icon: <ShieldCheck className="w-5 h-5" />,
    content: `
       建設の最中、主の言葉がソロモンに臨みました。
      「もし、あなたがわたしの掟に歩み、わたしの法を行い、...るなら、わたしはあなたと共に住み、イスラエルの子らを捨てない」（6:11-13）。
      神殿という建物よりも、そこに住む者の「歩み」が重要であることが示されています。
    `
  }
];

const lessons = [
  {
    title: '徹底した準備 (Meticulous Preparation)',
    description: '現場で音を立てないための「切り出し場での準備」は、私たちの人生における「隠れた場所での備え」の重要性を教えてくれます。本番で輝くためには、人に見えないところでの努力が不可欠です。',
    icon: <Construction className="text-amber-600" />
  },
  {
    title: '目に見えない部分の価値 (Inner Quality)',
    description: '外側だけでなく、建物の内部、さらには至聖所の細部にまで金が張られました。他人の目に触れないプライベートな領域や心の動機にまで、神は「最高のもの」を求められます。',
    icon: <CheckCircle2 className="text-amber-600" />
  },
  {
    title: '建物よりも歩みが先 (Character over Structure)',
    description: '壮麗な神殿を建てていても、主の掟から離れれば、その建物に神は住まわれません。私たちの人生が「神の宮」であるなら、外見の成功（建物）以上に、神への従順（歩み）が本質です。',
    icon: <ShieldCheck className="text-amber-600" />
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAiInsight = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setAiResponse(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `列王記第一 第6章について詳しく知りたいです。特に次の質問について、聖書的な背景と教訓を交えて答えてください：${query}`,
        config: {
          systemInstruction: "あなたは聖書学者であり、人生のコーチでもある賢者です。列王記第一 6章の神殿建設の背景をもとに、現代の人々に響く温かく深い洞察を提供してください。回答は日本語で、構造化して答えてください。"
        }
      });
      setAiResponse(response.text || "回答が得られませんでした。");
    } catch (error) {
      console.error(error);
      setAiResponse("AIとの接続でエラーが発生しました。設定を確認してください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-20">
          
          {/* Sidebar Area */}
          <aside className="space-y-12">
            <div>
              <header className="mb-12">
                <span className="inline-block px-3 py-1 mb-6 text-[10px] tracking-[0.2em] uppercase border border-gold/40 rounded-full text-gold">
                  CHAPTER OVERVIEW
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-light mb-4 tracking-tight leading-tight">
                  列王記第一<br />
                  <span className="text-gold italic">第6章</span>
                </h1>
                <h2 className="text-sm tracking-[0.3em] uppercase text-text-secondary mt-4">
                  ソロモン神殿の造営
                </h2>
              </header>

              {/* Stats Box */}
              <div className="bg-surface p-8 border border-gold-border rounded-sm space-y-6">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-gold opacity-80">工期</span>
                  <span className="block font-serif text-lg italic text-text-primary">4年目から11年目（計7年）</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-gold opacity-80">主要素材</span>
                  <span className="block font-serif text-lg italic text-text-primary">杉材、石材、純金</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-gold opacity-80">構造</span>
                  <span className="block font-serif text-lg italic text-text-primary">三階建ての脇間、至聖所</span>
                </div>
              </div>

              <div className="mt-8 text-xs text-text-secondary leading-relaxed font-serif italic">
                この章は、イスラエルの歴史における物理的な「神の住まい」の完成を象徴しています。細部へのこだわりは、神への畏敬の念を表しています。
              </div>
            </div>

            {/* AI Helper Sidebar Inside Sidebar for Desktop */}
            <div className="bg-surface/50 p-8 rounded-xl border border-gold-border/30">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-gold" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold">Sage's Insight</h3>
              </div>
              <p className="text-sm text-text-secondary mb-6 font-serif italic italic-small leading-relaxed">
                列王記6章の深い意味について、AIに尋ねてみましょう。
              </p>
              
              <div className="relative mb-6">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="例: なぜ鉄の道具を使わなかったのですか？"
                  className="w-full bg-bg border border-gold-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-text-secondary/30 min-h-[120px] resize-none text-text-primary"
                />
              </div>
              
              <button
                onClick={fetchAiInsight}
                disabled={isLoading}
                className="group w-full bg-gold hover:bg-gold/80 text-bg font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-colors active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-xs uppercase tracking-widest">洞察を得る</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-gold-border/30"
                >
                  <div className="prose prose-invert prose-sm">
                    <p className="text-text-secondary text-xs italic font-serif leading-relaxed line-clamp-10">
                      {aiResponse}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-16">
            
            {/* Tabs for Overview */}
            <div className="space-y-8">
              <nav className="flex gap-4 border-b border-gold-border/20 pb-0 overflow-x-auto no-scrollbar">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`pb-4 px-2 text-[10px] tracking-[0.2em] uppercase transition-all whitespace-nowrap relative ${
                      activeTab === section.id ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {section.title.split(' ')[0]}
                    {activeTab === section.id && (
                      <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold" />
                    )}
                  </button>
                ))}
              </nav>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface/30 p-8 md:p-12 rounded-sm border border-gold-border/10"
                >
                  <h3 className="text-2xl font-serif text-gold mb-6 italic">
                    {sections.find(s => s.id === activeTab)?.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-text-secondary font-serif italic">
                    {sections.find(s => s.id === activeTab)?.content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Lessons Section */}
            <div className="space-y-10">
              <h3 className="text-xs tracking-[0.4em] uppercase text-gold font-bold flex items-center gap-4">
                <div className="h-[1px] w-10 bg-gold/50"></div>
                Modern Lessons
              </h3>
              
              <div className="space-y-12">
                {lessons.map((lesson, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-8 group"
                  >
                    <div className="flex-shrink-0 font-serif text-4xl text-gold opacity-20 group-hover:opacity-100 transition-opacity">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-serif text-gold uppercase tracking-wide">
                        {lesson.title.split(' (')[0]}
                      </h4>
                      <p className="text-text-secondary leading-relaxed text-sm max-w-2xl">
                        {lesson.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Final Quote Box */}
            <div className="bg-surface p-10 border-l-4 border-gold rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="w-32 h-32 text-gold" />
              </div>
              <blockquote className="relative z-10 space-y-6">
                <p className="text-2xl font-serif italic text-text-primary leading-snug">
                  「もし、あなたがわたしの掟に従って歩み、わたしの定めに従い、わたしのすべての戒めを守って歩むなら、わたしはあなたと共に住み、わたしの民イスラエルを見捨てない。」
                </p>
                <cite className="block text-[10px] tracking-[0.3em] uppercase text-gold font-bold">
                  列王記第一 6:12-13
                </cite>
              </blockquote>
            </div>
          </main>
        </div>
      </div>

      <footer className="py-20 border-t border-gold-border/10 text-center opacity-30 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase">Built with Wisdom & Golden Standard</p>
      </footer>
    </div>
  );
}

