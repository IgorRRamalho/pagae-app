import { motion } from 'framer-motion';
import { Ghost, ImagePlus, User, UserPlus, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const GhostFriendForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👻');
  const [contactType, setContactType] = useState('instagram');
  const [isUploading, setIsUploading] = useState(false);

  const avatars = ['👻', '🧟', '💀', '👽', '🎃', '🤖'];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Enviado");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-8">
        <Wand2 className="text-purple-600 dark:text-purple-400 h-8 w-8" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cadastrar Amigo Fantasma
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção Avatar */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Escolha o avatar
          </label>
          
          <div className="grid grid-cols-6 gap-3">
            {/* Emojis */}
            {avatars.map((emoji) => (
              <motion.button
                key={emoji}
                type="button"
                onClick={() => setSelectedAvatar(emoji)}
                className={`text-3xl p-3 rounded-xl transition-all ${
                  selectedAvatar === emoji 
                    ? 'bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {emoji}
              </motion.button>
            ))}
            
            {/* Upload Foto */}
            <motion.label 
              className={`flex items-center justify-center cursor-pointer text-gray-400 
                dark:text-gray-500 p-3 rounded-xl border-2 border-dashed 
                ${isUploading ? 'animate-pulse' : 'hover:border-purple-500'}`}
              whileHover={{ scale: 1.05 }}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setIsUploading(true);
                  // Handle upload logic
                }}
              />
              <ImagePlus className="w-8 h-8" />
            </motion.label>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome do Fantasma
            </label>
            <div className="flex gap-3 items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600">
              <User className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Ex: Zé do Caixão"
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Como cobrar?
            </label>
            <div className="flex gap-2">
              <select 
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              >
                <option value="instagram">@ Instagram</option>
                <option value="email">📧 E-mail</option>
                <option value="phone">📱 Telefone</option>
              </select>
              
              <div className="flex-1 flex gap-3 items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                {contactType === 'instagram' && <span className="text-gray-500">@</span>}
                <input
                  type={contactType === 'phone' ? 'tel' : 'text'}
                  placeholder={
                    contactType === 'instagram' ? 'usuário' :
                    contactType === 'email' ? 'exemplo@email.com' :
                    '(99) 99999-9999'
                  }
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Preview */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <Ghost className="w-5 h-5" />
            <span className="font-medium">
              {name || 'Fulano'} não está no PagAê!... ainda! 😏
            </span>
          </div>
        </div>

        {/* Botão Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold
                    flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Cadastrar Fantasma
        </motion.button>
      </form>
    </motion.div>
  );
};

export default GhostFriendForm;