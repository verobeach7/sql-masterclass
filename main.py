import sqlite3

# Connection
conn = sqlite3.connect("users.db")

# Cursor: reader 혹은 writer의 역할을 함
cur = conn.cursor()


# Initializing and Insert
def init_table():
    # cur.excute()에 SQL 작성
    cur.execute(
        """
    CREATE TABLE users (
    user_id integer primary key autoincrement,
    username text not null,
    password text not null
    );
    """
    )
    cur.execute(
        """
    INSERT INTO users (username, password)
    VALUES ('nico', 123), ('lynn', 321);
    """
    )


def print_all_users():
    # res: result -> Cursor를 반환함
    res = cur.execute("SELECT * FROM users;")
    # 얼마나 많은 양을 fetch할 것인지 결정해줘야 함. 데이터베이스가 큰 경우에는 일부만 fetch해야 함. 메모리 공간과 시간 고려.
    data = res.fetchall()
    print(data)


# init_table()
print_all_users()

# commit 없이는 transaction이 종료되지 않기 때문에 수정 사항이 반영되지 않음
# 반드시 Commit해줘야 함
conn.commit()

# 메모리 누수나 Connection이 열려있는 상태를 방지하기 위해 반드시 닫아줘야 함
conn.close()
