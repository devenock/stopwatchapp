import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen(): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (timeInMs: number): string => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const centiseconds = Math.floor((timeInMs % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = (): void => {
    setIsRunning(!isRunning);
  };

  const handleReset = (): void => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = (): void => {
    if (isRunning) {
      setLaps(prevLaps => [time, ...prevLaps]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1a1a1a" 
        translucent={false}
      />
      
      {/* App Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Stopwatch</Text>
      </View>
      
      {/* Main Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.startStopButton,
            isRunning ? styles.stopButton : styles.startButton,
          ]}
          onPress={handleStartStop}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, styles.mainButtonText]}>
            {isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.lapButton,
            !isRunning && styles.disabledButton,
          ]}
          onPress={handleLap}
          disabled={!isRunning}
          activeOpacity={isRunning ? 0.7 : 1}
        >
          <Text style={[styles.buttonText, !isRunning && styles.disabledText]}>
            Lap
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lap Times */}
      {laps.length > 0 && (
        <View style={styles.lapsContainer}>
          <Text style={styles.lapsTitle}>Lap Times</Text>
          <ScrollView style={styles.lapsList} showsVerticalScrollIndicator={false}>
            {laps.map((lapTime: number, index: number) => (
              <View key={index} style={styles.lapItem}>
                <Text style={styles.lapNumber}>Lap {laps.length - index}</Text>
                <Text style={styles.lapTime}>{formatTime(lapTime)}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 1,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timerText: {
    fontSize: 56,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: -2,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#45a049',
  },
  stopButton: {
    backgroundColor: '#f44336',
    borderColor: '#da190b',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    borderColor: '#5a6268',
  },
  lapButton: {
    backgroundColor: '#007AFF',
    borderColor: '#0056CC',
  },
  disabledButton: {
    backgroundColor: '#333333',
    borderColor: '#666666',
    elevation: 0,
    shadowOpacity: 0,
  },
  startStopButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  mainButtonText: {
    fontSize: 16,
  },
  disabledText: {
    color: '#999999',
  },
  lapsContainer: {
    flex: 1,
    maxHeight: 250,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  lapsTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  lapsList: {
    flex: 1,
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 2,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  lapNumber: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '500',
  },
  lapTime: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
  },
});