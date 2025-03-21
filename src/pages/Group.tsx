import { motion } from 'framer-motion';
import { BarChart, Crown, Plus, Skull, Users } from 'lucide-react';
import { useState } from 'react';

const Group = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('👥');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [groupName, setGroupName] = useState('');

  // Cores e ícones disponíveis
  const groupColors = [
    { name: 'purple', class: 'bg-gradient-to-r from-purple-600 to-pink-600' },
    { name: 'green', class: 'bg-gradient-to-r from-green-600 to-cyan-600' },
    { name: 'orange', class: 'bg-gradient-to-r from-orange-600 to-red-600' },
    { name: 'blue', class: 'bg-gradient-to-r from-blue-600 to-indigo-600' }
  ];

  const groupIcons = ['🍕', '🍻', '🎮', '🚗', '🎉', '🏖️', '🎲', '📽️'];

  // Dados de exemplo
  const groups = [
    {
      name: 'Turma da Pizza',
      icon: '🍕',
      color: 'purple',
      total: 'R$ 320,00',
      stats: {
        topDividers: { name: 'Maria', count: 8 },
        biggestDebt: { name: 'João', amount: 'R$ 47,00' }
      }
    },
    {
      name: 'Time do Churras',
      icon: '🔥',
      color: 'orange',
      total: 'R$ 185,00',
      stats: {
        topDividers: { name: 'Carlos', count: 5 },
        biggestDebt: { name: 'Ana', amount: 'R$ 32,00' }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-purple-700 dark:text-purple-400 h-8 w-8" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Tribos do PagAê 
              <span className="ml-2">🛡️</span>
            </h1>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowCreateGroup(!showCreateGroup)}
            className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-6 py-3 rounded-full 
                      flex items-center gap-2 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            <span>Criar Tribo</span>
          </motion.button>
        </div>

        {/* Formulário de Criação */}
        {showCreateGroup && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Personalize sua Tribo</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Nome da Tribo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Turma da Pizza"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 
                            text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Escolha o Emblema
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {groupIcons.map((icon) => (
                    <motion.button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`text-2xl p-2 rounded-lg ${
                        selectedIcon === icon 
                          ? 'bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Cores da Tribo
                </label>
                <div className="flex gap-3">
                  {groupColors.map((color) => (
                    <motion.button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full ${color.class} 
                        ${selectedColor === color.name ? 'ring-4 ring-purple-500' : ''}`}
                      whileHover={{ scale: 1.05 }}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-bold
                          focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Criar Tribo 🎉
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Lista de Grupos */}
        <div className="grid md:grid-cols-2 gap-4">
          {groups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl shadow-lg ${
                group.color === 'purple' ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50' :
                group.color === 'green' ? 'bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-900/50 dark:to-cyan-900/50' :
                group.color === 'orange' ? 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/50 dark:to-red-900/50' :
                'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-2xl p-2 rounded-lg ${
                  group.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/50' :
                  group.color === 'green' ? 'bg-green-100 dark:bg-green-900/50' :
                  group.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/50' :
                  'bg-blue-100 dark:bg-blue-900/50'
                }`}>
                  {group.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{group.name}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total do Mês</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">{group.total}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg flex items-center gap-2">
                    <Crown className="text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Top Divider</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {group.stats.topDividers.name} ({group.stats.topDividers.count}x)
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg flex items-center gap-2">
                    <Skull className="text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Maior Dívida</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {group.stats.biggestDebt.name} ({group.stats.biggestDebt.amount})
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className={`w-full ${
                    group.color === 'purple' ? 'bg-purple-700 hover:bg-purple-800' :
                    group.color === 'green' ? 'bg-green-700 hover:bg-green-800' :
                    group.color === 'orange' ? 'bg-orange-700 hover:bg-orange-800' :
                    'bg-blue-700 hover:bg-blue-800'
                  } text-white py-2 rounded-lg flex items-center justify-center gap-2 focus:ring-2 focus:ring-purple-500`}
                >
                  <BarChart className="w-4 h-4" />
                  Ver Histórico Completo
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {groups.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-600 dark:text-gray-400"
          >
            <Users className="mx-auto h-12 w-12 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="text-lg">Nenhuma tribo encontrada!</p>
            <p>Crie seu primeiro grupo para começar a diversão 🎊</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Group;