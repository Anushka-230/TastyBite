<?php
class User {
    private $conn;
    private $table = 'users';

    public $id;
    public $name;
    public $email;
    public $password;
    public $role;
    public $age;
    public $date_of_joining;
    public $salary;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT id, name, email, role, age, date_of_joining, salary, created_at FROM ' . $this->table . ' ORDER BY created_at DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' SET name=:name, email=:email, password=:password, role=:role, age=:age, date_of_joining=:date_of_joining, salary=:salary';

        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->age = htmlspecialchars(strip_tags($this->age));
        $this->date_of_joining = htmlspecialchars(strip_tags($this->date_of_joining));
        $this->salary = htmlspecialchars(strip_tags($this->salary));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':age', $this->age);
        $stmt->bindParam(':date_of_joining', $this->date_of_joining);
        $stmt->bindParam(':salary', $this->salary);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
    }
}
?>
