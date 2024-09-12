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
  // Store the original window.location before tests
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.location to prevent real navigation
    delete window.location;
    window.location = { ...originalLocation, href: '' };
  });

  afterAll(() => {
    // Restore the original window.location after tests
    window.location = originalLocation;
  });

  test('should display login and registration links when user is not logged in', () => {
    // Mock user data to be null
    (userService.getUserData as jest.Mock).mockReturnValue(null);

    render(
      <Router>
        <UserMenu isLeft={false} />
      </Router>
    );

    expect(screen.getByText('שלום אורח |')).toBeInTheDocument();
    expect(screen.getByText('הרשמה')).toBeInTheDocument();
    expect(screen.getByText('התחברות')).toBeInTheDocument();
  });

  test('should display user name and logout link when user is logged in', () => {
    // Mock user data
    const userData = { firstName: 'John', lastName: 'Doe' };
    (userService.getUserData as jest.Mock).mockReturnValue(userData);

    render(
      <Router>
        <UserMenu isLeft={false} />
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
        <UserMenu isLeft={false} />
      </Router>
    );

    fireEvent.click(screen.getByText('התנתקות'));

    expect(userService.logout).toHaveBeenCalled();
    expect(notify.success).toHaveBeenCalledWith('תודה שבקרת באתר שלנו, נשמח לראותך שוב');
    expect(window.location.href).toBe('/home');
  });
});
