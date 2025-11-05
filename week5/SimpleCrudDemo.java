import java.sql.*;
import java.util.Scanner;

public class SimpleCrudDemo {
    static final String URL = "jdbc:mysql://localhost:3306/studentdb";
    static final String USER = "root";
    static final String PASS = "Welcome@1234$";

    public static void main(String[] args) {
        try (Connection con = DriverManager.getConnection(URL, USER, PASS);
             Scanner sc = new Scanner(System.in)) {

            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Connected to MySQL!");

            while (true) {
                System.out.println("\n1.Insert  2.Display  3.Update  4.Delete  5.Exit");
                System.out.print("Enter choice: ");
                int ch = sc.nextInt();

                switch (ch) {
                    case 1 -> insert(con, sc);
                    case 2 -> display(con);
                    case 3 -> update(con, sc);
                    case 4 -> delete(con, sc);
                    case 5 -> { System.out.println("Goodbye!"); return; }
                    default -> System.out.println("Invalid choice!");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ----- CREATE -----
    static void insert(Connection con, Scanner sc) throws SQLException {
        System.out.print("Enter id, name, age: ");
        int id = sc.nextInt(); String name = sc.next(); int age = sc.nextInt();

        String q = "INSERT INTO student VALUES(?,?,?)";
        try (PreparedStatement ps = con.prepareStatement(q)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setInt(3, age);
            ps.executeUpdate();
            System.out.println("Record inserted!");
        }
    }

    // ----- READ -----
    static void display(Connection con) throws SQLException {
        String q = "SELECT * FROM student";
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(q)) {
            while (rs.next())
                System.out.println(rs.getInt(1)+" "+rs.getString(2)+" "+rs.getInt(3));
        }
    }

    // ----- UPDATE -----
    static void update(Connection con, Scanner sc) throws SQLException {
        System.out.print("Enter id and new age: ");
        int id = sc.nextInt(); int age = sc.nextInt();

        String q = "UPDATE student SET age=? WHERE id=?";
        try (PreparedStatement ps = con.prepareStatement(q)) {
            ps.setInt(1, age);
            ps.setInt(2, id);
            int n = ps.executeUpdate();
            System.out.println(n>0 ? "Updated!" : "ID not found!");
        }
    }

    // ----- DELETE -----
    static void delete(Connection con, Scanner sc) throws SQLException {
        System.out.print("Enter id to delete: ");
        int id = sc.nextInt();

        String q = "DELETE FROM student WHERE id=?";
        try (PreparedStatement ps = con.prepareStatement(q)) {
            ps.setInt(1, id);
            int n = ps.executeUpdate();
            System.out.println(n>0 ? "Deleted!" : "ID not found!");
        }
    }
}
