import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Button } from '@/components/Button';
import { Space } from '@/components/Space';

export default function GameOver() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const textColor = useThemeColor({}, "lightText");

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Game Over!</Text>
      <Text style={[styles.score, { color: textColor }]}>Your Score: {score || 0}</Text>
      
      <Button href="/game">New Game</Button>

      <Space spacing={16} />

      <Button href="/">Home</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
