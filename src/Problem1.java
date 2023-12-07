import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;


public class Problem1 {
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
    public static void main(String[] args) throws IOException {
        long startTime = System.currentTimeMillis();
        String absPath = Paths.get(System.getProperty("user.dir"), "src", "inputProblem1.txt").toString();
        BufferedReader reader = new BufferedReader(new FileReader(absPath));
        String line;
        Holder h = new Holder();
        int sum = 0;
        while ((line = reader.readLine()) != null) {
            for (char c : line.toCharArray()) {
                h.addNumber(c);
            }
            sum += h.returnSum();
            h.reset();
        }
        reader.close();
        System.out.println(sum); //-> Prints 53921


        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        System.out.println("Execution time: " + duration + " milliseconds");
    }
}
