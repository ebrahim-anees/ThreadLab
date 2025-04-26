// ImgLoading.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';

export default function ImgLoading() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-md z-10 rounded-lg"
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Loader2Icon className="w-12 h-12 text-primary animate-spin" />
          <span className="mt-3 text-base text-primary">Uploading...</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
