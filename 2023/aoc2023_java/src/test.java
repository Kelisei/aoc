import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class test {
    public static void main(String[] args) {
        // Supongamos que tienes una cadena que contiene la información de la cantidad de objetos
        String cadena = "3 blue, 4 red, 2 green";

        // Definir patrones para buscar números
        Pattern patternBlue = Pattern.compile("(\\d+) blue");
        Pattern patternRed = Pattern.compile("(\\d+) red");
        Pattern patternGreen = Pattern.compile("(\\d+) green");

        // Encontrar coincidencias usando expresiones regulares
        Matcher matcherBlue = patternBlue.matcher(cadena);
        Matcher matcherRed = patternRed.matcher(cadena);
        Matcher matcherGreen = patternGreen.matcher(cadena);

        // Extraer cantidades
        int cantidadBlue = matcherBlue.find() ? Integer.parseInt(matcherBlue.group(1)) : 0;
        int cantidadRed = matcherRed.find() ? Integer.parseInt(matcherRed.group(1)) : 0;
        int cantidadGreen = matcherGreen.find() ? Integer.parseInt(matcherGreen.group(1)) : 0;

        // Imprimir cantidades
        System.out.println("Cantidad de objetos azules: " + cantidadBlue);
        System.out.println("Cantidad de objetos rojos: " + cantidadRed);
        System.out.println("Cantidad de objetos verdes: " + cantidadGreen);
    }
}
