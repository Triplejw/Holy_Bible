import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Info, Mail, Star, Github } from 'lucide-react-native';

export default function SettingsScreen() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Display</Text>
          
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.backgroundSecondary }]}
            onPress={toggleTheme}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionText, { color: colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
              {isDark ? (
                <Moon size={24} color={colors.text} />
              ) : (
                <Sun size={24} color={colors.text} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Info size={20} color={colors.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Version</Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>1.0.0</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Github size={20} color={colors.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Source Code</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Mail size={20} color={colors.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Contact</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 16,
    marginTop: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  settingValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  option: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});