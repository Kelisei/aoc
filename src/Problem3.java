import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
/*
My worst enemy, Regexes.
 */
public class Problem3 {
    public static void main(String[] args) throws IOException {
        String absPath = Paths.get(System.getProperty("user.dir"), "src", "inputProblem3.txt").toString();
        BufferedReader reader = new BufferedReader(new FileReader(absPath));
        List<String> grid = reader.lines().toList();
        reader.close();

        HashMap<String, Set<Integer>> charCoordinates = new HashMap<String, Set<Integer>>();
        for (int i = 0; i < grid.size(); i++){
            char [] col = grid.get(i).toCharArray();
            for(int j=0; j < col.length; j++){
                char element = col[j];
                if (!"01234566789.".contains(String.valueOf(element))) {
                    String coor = i + "," + j;
                    charCoordinates.put(coor, new HashSet<>());
                }
            }
        }

        Pattern pattern = Pattern.compile("\\d+");
        for(int i = 0; i < grid.size(); i++){
            String row = grid.get(i);
            Matcher matcher = pattern.matcher(row);
            while(matcher.find()){
                int start = matcher.start();
                int end = matcher.end();
                Set<String> edge = new HashSet<>();
                for (int x = i-1; x <= i+1; x++){
                    for(int y = start -1; y <= end; y++){
                        edge.add(x + "," + y);
                    }
                }

                for (String coor : edge) {
                    if (charCoordinates.containsKey(coor)) {
                        charCoordinates.get(coor).add(Integer.parseInt(matcher.group()));
                    }
                }
            }
        }
        int sum = 0;
        for (Set<Integer> p : charCoordinates.values()) {
            sum += p.stream().mapToInt(Integer::intValue).sum();
        }
        System.out.println(sum); // -> 535351
    }
}
