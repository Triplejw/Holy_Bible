import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react-native';

export default function SummaryModal({ isVisible, onClose, book, chapter }) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  // Mock data - in a real app, this would come from an AI API
  const generateSummary = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockSummaries = {
        'Genesis-1': "Genesis Chapter 1 describes the creation of the world. God creates light and darkness, the sky, land and sea, plants, sun, moon, and stars, sea creatures, birds, land animals, and finally humans. After each creation, God sees that it is good. Humans are made in God's image and given dominion over all living things. The chapter ends with God blessing humans and declaring all creation very good.",
        'Exodus-20': "Exodus Chapter 20 presents the Ten Commandments given by God to Moses on Mount Sinai. These commandments establish the foundation of moral and religious law, including worshipping only God, not making idols, not misusing God's name, keeping the Sabbath holy, honoring parents, and prohibitions against murder, adultery, stealing, lying, and coveting. The people are afraid of God's presence and ask Moses to be their intermediary.",
        'Psalms-23': "Psalm 23 is a beautiful expression of trust in God as a shepherd who provides, protects, and guides. The psalmist describes how God leads to green pastures and still waters, restores the soul, and guides along right paths. Even in dark valleys, God's presence removes fear. The psalm concludes with images of God's abundant provision, goodness and love following the psalmist, and dwelling in God's house forever.",
        'Matthew-5': "Matthew Chapter 5 contains the beginning of Jesus' Sermon on the Mount. It starts with the Beatitudes, where Jesus pronounces blessings on the poor in spirit, mourners, the meek, those hungering for righteousness, the merciful, pure in heart, peacemakers, and the persecuted. Jesus then discusses his relationship to the law, saying he came to fulfill it, not abolish it. He reinterprets several commandments, calling for a deeper righteousness that addresses the heart's attitudes, not just outward actions.",
        'Revelation-21': "Revelation Chapter 21 describes the vision of a new heaven and new earth, with the New Jerusalem descending from heaven. God will dwell with humanity, wiping away all tears, with no more death, mourning, crying or pain. The city is described in magnificent detail—built of gold and precious stones, perfectly cubic in shape, with twelve gates made of pearl, each inscribed with names of the twelve tribes of Israel. The city needs no sun or temple because God's glory illuminates it, and only those written in the Lamb's book of life may enter.",
      };

      // Default summary if specific one not found
      const key = `${book}-${chapter}`;
      const defaultSummary = `This chapter from ${book} contains important spiritual teachings and historical accounts. The text explores themes of faith, obedience, and God's relationship with humanity. Various interpretations exist among scholars, but the central message emphasizes divine guidance and moral principles that remain relevant today.`;
      
      setSummary(mockSummaries[key] || defaultSummary);
      setLoading(false);
    }, 1500);
  };

  // Generate summary when modal opens
  if (isVisible && !loading && !summary) {
    generateSummary();
  }

  // Reset summary when modal closes
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSummary('');
    }, 300);
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.backgroundSecondary }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {book} {chapter} Summary
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                  Generating summary...
                </Text>
              </View>
            ) : (
              <Text style={[styles.summaryText, { color: colors.text }]}>
                {summary}
              </Text>
            )}
          </ScrollView>
          
          <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              AI-generated summary
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: 16,
    maxHeight: 400,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});