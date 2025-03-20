import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import DivisaoContas from '@pages/BillSplit';
import Configuracoes from '@pages/Settings';
import Friends from '@pages/Friends';


const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5,
    y: 50
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    rotate: 5,
    y: -50,
    transition: { 
      ease: 'easeInOut',
      duration: 0.3 
    }
  }
};

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  marginTop: '6rem',
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflow: 'hidden'
};

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div style={containerStyle}>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route index element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 overflow-y-auto"
            >
              <Home />
            </motion.div>
          } />
          <Route path="configuracoes" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 overflow-y-auto"
            >
              <Configuracoes />
            </motion.div>
          } />
          <Route path="divisao" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 overflow-y-auto"
            >
              <DivisaoContas />
            </motion.div>
          } />
           <Route path="amigos" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 overflow-y-auto"
            >
              <Friends />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}