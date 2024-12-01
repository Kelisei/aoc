import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Problem2_pt2 {
    private static class Set {
        private int maxBlue;
        private int maxGreen;;
        private int maxRed;
        private static final Pattern P_BLUE = Pattern.compile("(\\d+) blue"); // (\d+) -> Captures any number
        private static final Pattern P_RED = Pattern.compile("(\\d+) red");
        private static final Pattern P_GREEN = Pattern.compile("(\\d+) green");

        public Set() {
            maxBlue = 0;
            maxGreen = 0;
            maxRed = 0;
        }

        public void reset() {
            maxBlue = 0;
            maxGreen = 0;
            maxRed = 0;
        }

        public void getAmounts(String set) {
            Matcher matcherBlue = P_BLUE.matcher(set);
            Matcher matcherRed = P_RED.matcher(set);
            Matcher matcherGreen = P_GREEN.matcher(set);
            int blue = matcherBlue.find() ? Integer.parseInt(matcherBlue.group(1)) : 0;
            int red = matcherRed.find() ? Integer.parseInt(matcherRed.group(1)) : 0;
            int green = matcherGreen.find() ? Integer.parseInt(matcherGreen.group(1)) : 0;
            maxBlue = Math.max(maxBlue, blue);
            maxGreen = Math.max(maxGreen, green);
            maxRed = Math.max(maxRed, red);
        }
        public int getPower(){
            return maxBlue * maxGreen * maxRed;
        }
    }
    public static void main(String[] args) throws IOException {
        String absPath = Paths.get(System.getProperty("user.dir"), "src", "inputProblem2.txt").toString();
        BufferedReader reader = new BufferedReader(new FileReader(absPath));
        String line;
        int power = 0;
        Set set = new Set();
        while ((line = reader.readLine()) != null) {
            String[] sets = line.split(":")[1].split(";");
            for (String setStr : sets){
                set.getAmounts(setStr);
            }
            power += set.getPower();
            set.reset();
        }
        reader.close();
        System.out.println(power); // -> Prints 84538
    }
}
