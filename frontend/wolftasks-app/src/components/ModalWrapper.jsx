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
          className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-300 dark:border-gray-700"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
