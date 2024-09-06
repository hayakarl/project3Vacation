// UserMenu.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/notify';

// Mock the userService and notify
jest.mock('../../../Services/UserService', () => ({
  userService: {
    getUserData: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock('../../../Utils/notify', () => ({
  notify: {
    success: jest.fn(),
  },
}));

describe('UserMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display login and registration links when user is not logged in', () => {
    // Mock user data to be null
    (userService.getUserData as jest.Mock).mockReturnValue(null);

    render(
      <Router>
        <UserMenu />
      </Router>
    );

    expect(screen.getByText('שלום אורח |')).toBeInTheDocument();
    expect(screen.getByText('הרשמה')).toBeInTheDocument();
    expect(screen.getByText('כניסה')).toBeInTheDocument();
  });

  test('should display user name and logout link when user is logged in', () => {
    // Mock user data
    const userData = { firstName: 'John', lastName: 'Doe' };
    (userService.getUserData as jest.Mock).mockReturnValue(userData);

    render(
      <Router>
        <UserMenu />
      </Router>
    );

    expect(screen.getByText('היי John Doe')).toBeInTheDocument();
    expect(screen.getByText('התנתקות')).toBeInTheDocument();
  });

  test('should log out user and redirect to /home on logout', () => {
    const userData = { firstName: 'John', lastName: 'Doe' };
    (userService.getUserData as jest.Mock).mockReturnValue(userData);

    render(
      <Router>
        <UserMenu />
      </Router>
    );

    fireEvent.click(screen.getByText('התנתקות'));

    expect(userService.logout).toHaveBeenCalled();
    expect(notify.success).toHaveBeenCalledWith('תודה שבקרת באתר שלנו, נשמח לראותך שוב');
    // Note: window.location.href assignment is not testable as-is; you may need to mock it
  });
});
