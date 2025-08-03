import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { JSX, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Type definitions
interface BMIData {
  bmi: number;
  category: string;
  weight: string;
  height: string;
  timestamp: string;
}

type BMICategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese' | '';

export default function HomeScreen(): JSX.Element {
  // State management for inputs and results
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BMICategory>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Load saved BMI data on app start
  useEffect(() => {
    loadSavedData();
  }, []);

  // AsyncStorage functions
  const saveBMIData = async (
    bmiValue: number,
    categoryValue: BMICategory,
    weightValue: string,
    heightValue: string
  ): Promise<void> => {
    try {
      const data: BMIData = {
        bmi: bmiValue,
        category: categoryValue,
        weight: weightValue,
        height: heightValue,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem('lastBMI', JSON.stringify(data));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const loadSavedData = async (): Promise<void> => {
    try {
      const savedData = await AsyncStorage.getItem('lastBMI');
      if (savedData) {
        const data: BMIData = JSON.parse(savedData);
        setBmi(data.bmi);
        setCategory(data.category as BMICategory);
        setWeight(data.weight);
        setHeight(data.height);
        setIsCalculated(true);
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  // Input validation function
  const validateInputs = (): boolean => {
    if (!weight.trim() || !height.trim()) {
      Alert.alert('Error', 'Please enter both weight and height');
      return false;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return false;
    }

    if (weightNum <= 0 || heightNum <= 0) {
      Alert.alert('Error', 'Please enter positive numbers');
      return false;
    }

    if (heightNum < 50 || heightNum > 300) {
      Alert.alert('Error', 'Please enter a realistic height (50-300 cm)');
      return false;
    }

    if (weightNum < 20 || weightNum > 500) {
      Alert.alert('Error', 'Please enter a realistic weight (20-500 kg)');
      return false;
    }

    return true;
  };

  // BMI calculation function
  const calculateBMI = (): void => {
    if (!validateInputs()) {
      return;
    }

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    
    // Convert height from cm to meters
    const heightInMeters = heightInCm / 100;
    
    // Calculate BMI using the formula: BMI = weight(kg) / height(m)²
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    
    // Round to 2 decimal places
    const roundedBMI = Math.round(bmiValue * 100) / 100;
    
    // Determine BMI category
    let bmiCategory: BMICategory = '';
    if (roundedBMI < 18.5) {
      bmiCategory = 'Underweight';
    } else if (roundedBMI >= 18.5 && roundedBMI <= 24.9) {
      bmiCategory = 'Normal weight';
    } else if (roundedBMI >= 25 && roundedBMI <= 29.9) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }

    // Update state
    setBmi(roundedBMI);
    setCategory(bmiCategory);
    setIsCalculated(true);

    // Save to AsyncStorage
    saveBMIData(roundedBMI, bmiCategory, weight, height);
  };

  // Clear all fields and results
  const clearAll = (): void => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    setIsCalculated(false);
  };

  // Get color based on BMI category
  const getCategoryColor = (): string => {
    switch (category) {
      case 'Underweight':
        return '#3498db'; // Blue
      case 'Normal weight':
        return '#27ae60'; // Green
      case 'Overweight':
        return '#f39c12'; // Orange
      case 'Obese':
        return '#e74c3c'; // Red
      default:
        return '#34495e'; // Dark gray
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>BMI Calculator</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Body Mass Index Calculator</ThemedText>
      </ThemedView>

      {/* Input Section */}
      <ThemedView style={styles.inputSection}>
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>Weight (kg)</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your weight"
            placeholderTextColor="#95a5a6"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>Height (cm)</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your height"
            placeholderTextColor="#95a5a6"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </ThemedView>
      </ThemedView>

      {/* Buttons Section */}
      <ThemedView style={styles.buttonSection}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
          <ThemedText style={styles.calculateButtonText}>Calculate BMI</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Results Section */}
      {isCalculated && (
        <ThemedView style={styles.resultsSection}>
          <ThemedText type="title" style={styles.resultsTitle}>Your BMI Result</ThemedText>
          
          <ThemedView style={styles.bmiContainer}>
            <ThemedText style={styles.bmiValue}>{bmi}</ThemedText>
            <ThemedText style={[styles.bmiCategory, { color: getCategoryColor() }]}>
              {category}
            </ThemedText>
          </ThemedView>

          {/* BMI Scale Reference */}
          <ThemedView style={styles.scaleContainer}>
            <ThemedText type="defaultSemiBold" style={styles.scaleTitle}>BMI Scale:</ThemedText>
            <ThemedView style={styles.scaleItem}>
              <ThemedText style={[styles.scaleText, { color: '#3498db' }]}>
                • Below 18.5: Underweight
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.scaleItem}>
              <ThemedText style={[styles.scaleText, { color: '#27ae60' }]}>
                • 18.5 - 24.9: Normal weight
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.scaleItem}>
              <ThemedText style={[styles.scaleText, { color: '#f39c12' }]}>
                • 25.0 - 29.9: Overweight
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.scaleItem}>
              <ThemedText style={[styles.scaleText, { color: '#e74c3c' }]}>
                • 30.0 and above: Obese
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      )}

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          BMI is a screening tool and not a diagnostic tool
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    borderRadius: 15,
  },
  headerTitle: {
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  calculateButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsSection: {
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resultsTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  bmiContainer: {
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bmiCategory: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scaleContainer: {
    marginTop: 10,
  },
  scaleTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  scaleItem: {
    marginBottom: 5,
  },
  scaleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});