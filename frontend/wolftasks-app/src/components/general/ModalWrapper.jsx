// components/ModalWrapper.jsx
import { AnimatePresence, motion } from 'framer-motion';

export default function ModalWrapper({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className=" bg-gray-900
          text-white
          p-5
          rounded-2xl
          shadow-2xl
          min-w-3/4
          min-h-3/4
          border
          border-gray-500"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
