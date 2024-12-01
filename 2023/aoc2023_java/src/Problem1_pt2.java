import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;


public class Problem1_pt2 {
    private static class Holder{
        private char number1;
        private char number2;
        private Holder() {
            this.number1 = 0;
            this.number2 = 0;
        }
        public void addNumber(char newChar){
            if (Character.isDigit(newChar)){
                if (number1 == 0){
                    number1 = newChar;
                }
                number2 = newChar;
            }
        }
        public int returnSum() {
            int numericValueOfChar1 = Character.getNumericValue(number1);
            int numericValueOfChar2 = Character.getNumericValue(number2);
            return numericValueOfChar1 * 10 + numericValueOfChar2;
        }
        public void reset(){
            this.number1 = 0;
            this.number2 = 0;
        }
    }
    private static String replaceSpelledOutNumbers(String line){
        //didn't find solution where you didn't hardcode this :C
        line = line.replace("one", "o1e");
        line = line.replace("two", "t2o");
        line = line.replace("three", "t3e");
        line = line.replace("four", "f4r");
        line = line.replace("five", "f5e");
        line = line.replace("six", "s6x");
        line = line.replace("seven", "s7n");
        line = line.replace("eight", "e8t");
        line = line.replace("nine", "n9e");
        return line;
    }
    public static void main(String[] args) throws IOException {
        String absPath = Paths.get(System.getProperty("user.dir"), "src", "inputProblem1.txt").toString();
        BufferedReader reader = new BufferedReader(new FileReader(absPath));
        String line;
        Holder h = new Holder();
        int sum = 0;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
            line = replaceSpelledOutNumbers(line);
            System.out.println(line);
            for (char c : line.toCharArray()) {
                h.addNumber(c);
            }
            sum += h.returnSum();
            h.reset();
        }
        reader.close();
        System.out.println(sum); //-> Prints 54676
    }
}
