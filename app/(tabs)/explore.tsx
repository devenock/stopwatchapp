import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About BMI</ThemedText>
      </ThemedView>
      <ThemedText>Learn more about Body Mass Index and how it's calculated.</ThemedText>
      
      <Collapsible title="What is BMI?">
        <ThemedText>
          Body Mass Index (BMI) is a simple calculation using a person's height and weight. 
          The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          BMI is a screening tool and is not intended to diagnose disease or illness.
        </ThemedText>
      </Collapsible>

      <Collapsible title="BMI Categories">
        <ThemedView style={styles.categoryContainer}>
          <ThemedText style={[styles.categoryText, { color: '#3498db' }]}>
            <ThemedText type="defaultSemiBold">Underweight:</ThemedText> BMI less than 18.5
          </ThemedText>
          <ThemedText style={[styles.categoryText, { color: '#27ae60' }]}>
            <ThemedText type="defaultSemiBold">Normal weight:</ThemedText> BMI 18.5-24.9
          </ThemedText>
          <ThemedText style={[styles.categoryText, { color: '#f39c12' }]}>
            <ThemedText type="defaultSemiBold">Overweight:</ThemedText> BMI 25-29.9
          </ThemedText>
          <ThemedText style={[styles.categoryText, { color: '#e74c3c' }]}>
            <ThemedText type="defaultSemiBold">Obese:</ThemedText> BMI 30 or greater
          </ThemedText>
        </ThemedView>
      </Collapsible>

      <Collapsible title="How to Use the Calculator">
        <ThemedText>
          1. Enter your weight in kilograms in the first input field
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          2. Enter your height in centimeters in the second input field
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          3. Tap "Calculate BMI" to see your result
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          4. Use "Clear All" to reset all fields and start over
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          Your last calculation is automatically saved and will be restored when you reopen the app.
        </ThemedText>
      </Collapsible>

      <Collapsible title="BMI Formula Explanation">
        <ThemedText>
          The BMI calculation uses the metric formula:
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.formula}>
          BMI = Weight (kg) ÷ Height (m)²
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          Since you enter height in centimeters, the app automatically converts it to meters by dividing by 100 before performing the calculation.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Important Notes">
        <ThemedText>
          • BMI is a screening tool, not a diagnostic tool
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          • It doesn't account for muscle mass, bone density, or body composition
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          • Consult with healthcare professionals for comprehensive health assessment
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          • BMI categories may not apply equally to all populations
        </ThemedText>
      </Collapsible>

      <Collapsible title="App Features">
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Input Validation:</ThemedText> Ensures you enter realistic values for weight (20-500 kg) and height (50-300 cm)
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          • <ThemedText type="defaultSemiBold">Data Persistence:</ThemedText> Your last calculation is saved and restored when you reopen the app
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          • <ThemedText type="defaultSemiBold">Color-Coded Results:</ThemedText> Results are displayed with colors corresponding to BMI categories
        </ThemedText>
        <ThemedText style={styles.marginTop}>
          • <ThemedText type="defaultSemiBold">Clear Function:</ThemedText> Easily reset all fields to start a new calculation
        </ThemedText>
      </Collapsible>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          This BMI Calculator was created as an educational project. 
          Always consult healthcare professionals for medical advice.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  categoryContainer: {
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
  },
  formula: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  footer: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});