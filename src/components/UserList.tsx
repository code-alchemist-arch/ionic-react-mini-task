import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=100');
        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const removeUser = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {users.map((user, index) => (
            <IonItemSliding key={user.email}>
              <IonItem>
                <IonLabel>
                  <h2>{user.name.first} {user.name.last}</h2>
                  <p>{user.email}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption onClick={() => removeUser(index)}>Remove</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UserList;