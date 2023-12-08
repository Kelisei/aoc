import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Problem2 {
    private static class Set {
        private int blue;
        private int red;
        private int green;
        private static final Pattern P_BLUE = Pattern.compile("(\\d+) blue"); // (\d+) -> Captures any number
        private static final Pattern P_RED = Pattern.compile("(\\d+) red");
        private static final Pattern P_GREEN = Pattern.compile("(\\d+) green");

        public Set() {
            blue = 0;
            red = 0;
            green = 0;
        }

        public void reset() {
            blue = 0;
            red = 0;
            green = 0;
        }

        public boolean getAmounts(String set) {
            Matcher matcherBlue = P_BLUE.matcher(set);
            Matcher matcherRed = P_RED.matcher(set);
            Matcher matcherGreen = P_GREEN.matcher(set);
            blue = matcherBlue.find() ? Integer.parseInt(matcherBlue.group(1)) : 0;
            red = matcherRed.find() ? Integer.parseInt(matcherRed.group(1)) : 0;
            green = matcherGreen.find() ? Integer.parseInt(matcherGreen.group(1)) : 0;
            return (blue <= 14 && green <= 13 && red <= 12);
        }
    }

    private static int getId(String line) {  //NOT necessary since the games go from 1 to 100
        int indexOfEmpty = line.indexOf(' ') + 1;
        int indexOfColon = line.indexOf(':', indexOfEmpty);
        return Integer.parseInt(line.substring(indexOfEmpty, indexOfColon));
    }

    public static void main(String[] args) throws IOException {
        String absPath = Paths.get(System.getProperty("user.dir"), "src", "inputProblem2.txt").toString();
        BufferedReader reader = new BufferedReader(new FileReader(absPath));
        String line;
        int id = 0;
        int idSum = 0;
        Set set = new Set();

        while ((line = reader.readLine()) != null) {
            //int id = getId(line);
            id++;
            String[] sets = line.split(":")[1].split(";");
            int i = 0;
            boolean playable = true;
            while (i < sets.length && playable) {
                playable = set.getAmounts(sets[i]);
                i++;
                set.reset();
            }
            if (playable) {
                idSum += id;
            }
        }
        reader.close();
        System.out.println(idSum); // -> Prints 1867
    }
}
