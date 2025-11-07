import java.sql.*;
import java.util.Scanner;

public class JdbcEx {
    private static final String URL = "jdbc:mysql://localhost:3306/studentdb";
    private static final String USER = "root";
    private static final String PASS = "Welcome@1234$";

    public static void main(String[] args) {
        try (Connection con = DriverManager.getConnection(URL, USER, PASS);
             Statement st = con.createStatement();
             Scanner sc = new Scanner(System.in)) {

            System.out.println("Connected to Database!");
            while (true) {
                System.out.println("\n1.Insert  2.Display  3.Update  4.Delete  5.Exit");
                System.out.print("Enter choice: ");
                int ch = sc.nextInt();

                if (ch == 1) {
                    System.out.print("Enter id, name, age: ");
                    int id = sc.nextInt(); String name = sc.next(); int age = sc.nextInt();
                    st.executeUpdate("INSERT INTO students VALUES(" + id + ",'" + name + "'," + age + ")");
                    System.out.println("Inserted!\n");
                }
                else if (ch == 2) {
                    ResultSet rs = st.executeQuery("SELECT * FROM students");
                    System.out.println("ID\tName\tAge");
                    while (rs.next()) System.out.println(rs.getInt(1) + "\t" + rs.getString(2) + "\t" + rs.getInt(3));
                }
                else if (ch == 3) {
                    System.out.print("Enter id and new age: ");
                    int id = sc.nextInt(), age = sc.nextInt();
                    st.executeUpdate("UPDATE students SET age=" + age + " WHERE id=" + id);
                    System.out.println("Updated!\n");
                }
                else if (ch == 4) {
                    System.out.print("Enter id to delete: ");
                    int id = sc.nextInt();
                    st.executeUpdate("DELETE FROM students WHERE id=" + id);
                    System.out.println("Deleted!\n");
                }
                else if (ch == 5) {
                    System.out.println("Goodbye!");
                    break;
                }
                else System.out.println("Invalid choice!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
