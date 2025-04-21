import Footer from '@components/Footer';
import NavLanding from '@components/NavLanding';
import { Sparkles, Users } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavLanding />

      {/* Seção Herói - História Pessoal */}
      <section className="relative py-32">
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-2 mb-8 space-x-2 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-200">
                Uma história de amizade e organização
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
                De uma necessidade simples<br />para uma solução prática
              </span>
            </h1>
          </div>

          {/* História Essencial */}
          <div className="mt-16 space-y-8 text-lg text-gray-600 dark:text-gray-300">
            <div className="relative p-8 border shadow-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm border-gray-100/50 dark:border-gray-700/30">
              <p className="text-center">
                "Tudo começou quando percebemos que <span className="font-semibold text-purple-600 dark:text-purple-400">ninguém do nosso grupo</span> conseguia lembrar direito quem havia pago o quê nas nossas saídas.
              </p>
            </div>

            <div className="flex items-center justify-center text-4xl">👇</div>

            <div className="relative p-8 border shadow-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm border-gray-100/50 dark:border-gray-700/30">
              <p className="text-center">
                Anotações em papéis perdidos, mensagens esquecidas no WhatsApp... Era preciso <span className="font-semibold text-red-600 dark:text-red-400">uma forma mais clara</span> de registrar essas pequenas dívidas do dia a dia.
              </p>
            </div>

            <div className="flex items-center justify-center text-4xl">💡</div>

            <div className="relative p-8 border shadow-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm border-gray-100/50 dark:border-gray-700/30">
              <p className="text-center">
                Decidimos criar o que <span className="font-semibold text-teal-600 dark:text-teal-400">gostaríamos de usar</span>: algo rápido, gratuito e que mantivesse a amizade em primeiro lugar, sem cobranças constrangedoras.
              </p>
            </div>

            {/* Elemento Visual de Evolução */}
            <div className="flex items-center justify-center mt-12">
              <div className="flex items-center justify-center w-full max-w-2xl p-6 bg-gray-100/50 dark:bg-gray-700/20 rounded-xl">
                <div className="text-center">
                  <span className="text-6xl">📝 → 🚀</span>
                  <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    De rascunhos no caderno à ferramenta que usamos diariamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Time */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-gray-900 dark:to-purple-900/10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Quem faz acontecer
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Duas mentes obcecadas por resolver problemas reais de forma prática
            </p>
          </div>

          <div className="grid gap-8 mt-16 md:grid-cols-2">
            {[
              {
                name: 'Igor',
                role: 'Desenvolvedor Sênior',
                bio: '"Já perdi R$1.200 em uma festa porque confiei na memória alheia. Hoje codifico para que ninguém passe por isso"',
                emoji: '👨💻',
                color: 'from-[#7C3AED] to-[#DC2626]',
                stats: ['+5 anos codando', 'Especialista em segurança financeira']
              },
              {
                name: 'Gabriel',
                role: 'Designer de Produto',
                bio: '"Minha missão é transformar planilhas complexas em interfaces que até minha avó entenderia"',
                emoji: '🎨',
                color: 'from-[#10B981] to-[#3B82F6]',
                stats: ['UX Award 2022', 'Focado em usabilidade real']
              }
            ].map((member, index) => (
              <div key={index} className={`p-8 bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/30 hover:shadow-3xl transition-all`}>
                <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${member.color} flex items-center justify-center text-4xl`}>
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">{member.name}</h3>
                <p className="mt-2 text-center text-purple-600 dark:text-purple-400">{member.role}</p>
                <blockquote className="mt-6 text-center text-gray-600 dark:text-gray-300">
                  “{member.bio}”
                </blockquote>
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  {member.stats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Missão Visual */}
          <div className="mt-20 p-8 bg-gradient-to-r from-[#7C3AED] to-[#DC2626] rounded-3xl shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white">Nossa Filosofia</h3>
              <p className="mt-4 text-lg text-purple-100">
                "Dinheiro entre amigos deve ser simples:
                <span className="block mt-2 font-medium">Registro claro • Lembretes automáticos • Histórico permanente</span>
                Sem chatices, sem constrangimentos."
              </p>
              <div className="inline-flex items-center px-6 py-3 mt-6 space-x-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white">Resolvemos R$380k em dívidas de grupos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <div className="py-20 text-center">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Chega de contas não pagas no grupo do WhatsApp
          </h2>
          <div className="mt-8">
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all bg-gradient-to-r from-[#7C3AED] to-[#DC2626] rounded-xl hover:scale-105 hover:shadow-2xl">
              Resolver Dívidas Agora
            </button>
          </div>
          <div className="mt-6 text-gray-600 dark:text-gray-300">
            <span className="inline-block mr-2">✅</span>
            <span>Já utilizamos para organizar:</span>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
              {['Viagens em grupo', 'Festas de aniversário', 'Presentes coletivos', 'Eventos corporativos'].map((item, i) => (
                <div key={i} className="px-3 py-1 bg-purple-100 rounded-full dark:bg-purple-900/20">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;