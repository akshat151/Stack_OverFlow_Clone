describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('successfully loads login page', () => {
      cy.contains('LOGIN');
    });
  
    it('switches to signup form when "Signup" is clicked', () => {
      cy.contains('Signup').click();
      cy.contains('SIGN-UP');
    });
  
    it('logs in with valid credentials', () => {
      cy.get('[name="username"]').type("iron_man");
      cy.get('[name="password"]').type("stark123");
      cy.contains('SUBMIT').click();
      cy.contains('Fake Stack Overflow');
    });
  });

describe('Home Page 1', () => {
    it('successfully shows All Questions string', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('All Questions');
    })
})

describe('Home Page 2', () => {
    it('successfully shows Ask a Question button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question');
    })
})

describe('Home Page 3', () => {
    it('successfully shows total questions number', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('2 questions');
    })
})

describe('Home Page 4', () => {
    it('successfully shows filter buttons', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');
    })
})

describe ('Home Page 5', () => {
    it('successfully shows menu items', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Questions');
        cy.contains('Tags');
    })
})

describe ('Home Page 6', () => {
    it('successfully shows search bar', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.get('#searchBar');
    })
})

describe('Home Page 7', () => {
    it('successfully shows page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
    })
})

describe('Home Page 8', () => {
    it('successfully shows all questions in model', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Home Page 9', () => {
    it('successfully shows all question stats', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        const answers = ['3 answers','2 answers'];
        const views = ['129 views','121 views'];
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
        })
    })
})

describe('Home Page 10', () => {
    it('successfully shows all question authors and date time', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        const authors = ['saltyPeter', 'JoJi John'];
        const date = ['Oct 01', 'Jan 20'];
        const times = ['11:24', '03:24'];
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        })
    })
})


describe('Home Page 11', () => {
    it('successfully shows all questions in model in active order', () => {
        const qTitles = ['Programmatically navigate using React router', 'android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Active').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Home Page 12', () => {
    it('successfully shows all unanswered questions in model', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Unanswered').click();
        cy.contains('0 questions');
    })
})

describe('New Question Form', () => {
    it('Ask a Question creates and displays in All Questions', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        const qTitles = ['Test Question 1', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
    })
})

describe('New Question Form Metadata', () => {
    it('Ask a Question creates and displays expected meta data', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('4 questions');
        cy.contains('iron_man asked 0 seconds ago');
        const answers = ['0 answers', '0 answers', '3 answers','2 answers'];
        const views = ['0 views', '0 views', '129 views','121 views'];
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
        });
        cy.contains('Unanswered').click();
        cy.get('.postTitle').should('have.length', 2);
        cy.contains('2 question');
    })
})

describe('New Question Form with many tags 1', () => {
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t1 t2');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');
        cy.contains('t1');
        cy.contains('t2');
    })
})

describe('New Question Form with many tags 2', () => {
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t1 t2');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');
        cy.contains('android-studio');
        cy.contains('t2');
    })
})

describe('New Question Form Error Empty Title', () => {
    it('Ask a Question with empty title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');
    })
})

describe('New Question Form Error Long Title', () => {
    it('Ask a Question with long title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be more than 100 characters');
    })
})

describe('New Question Form Error Empty Text', () => {
    it('Ask a Question with empty text shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Question text cannot be empty');
    })
})

describe('New Question Form Error Extra Tags', () => {
    it('Ask a Question with more than 5 tags shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3 t4 t5 t6');
        cy.contains('Post Question').click();
        cy.contains('Cannot have more than 5 tags');
    })
})

describe('New Question Form Error Long New Tag', () => {
    it('Ask a Question with a long new tag', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3t4t5t6t7t8t9t3t4t5t6t7t8t9');
        cy.contains('Post Question').click();
        cy.contains('New tag length cannot be more than 20');
    })
})

describe('Answer Page 1', () => {
    it('Answer Page displays expected header', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('#answersHeader').should('contain', 'android studio save string shared preference, start activity and load the saved string');
        cy.get('#answersHeader').should('contain', '3 answers');
        cy.get('#answersHeader').should('contain', 'Ask a Question');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
    })
})

describe('Answer Page 2', () => {
    it('Answer Page displays expected question text', () => {
        const text = "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time I switch to a different view. I just hide/show my fragments depending on the icon selected. The problem I am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what I am using to refrain them from being recreated.";
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('#questionBody').should('contain', '131 views');
        cy.get('#questionBody').should('contain', text);
        cy.get('#questionBody').should('contain', 'saltyPeter');
        cy.get('#questionBody').should('contain', 'Oct 01, 2023');
        cy.get('#questionBody').should('contain', '11:24');
    })
})

describe('Answer Page 3', () => {
    it('Answer Page displays expected answers', () => {
        const answers = ["Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.", "YourPreference yourPreference = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);", "I just found all the above examples just too confusing, so I wrote my own. "];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
    });
});

describe('Answer Page 4', () => {
    it('Answer Page displays expected authors', () => {
        const authors = ['Natalie', 'Monica', 'Ross'];
        const date = ['Nov 18','Nov 12', 'Nov 01'];
        const times = ['09:24','03:30', '15:24'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('.answerAuthor').each(($el, index) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        });
    });
});

describe('New Answer Page 1', () => {
    it('Create new answer should be displayed at the top of the answers page', () => {
        const answers = ["Test Answer 1", "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Test Question 1').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type(answers[0]);
        cy.contains('Post Answer').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
        cy.contains('0 seconds ago');
    });
});

describe('New Answer Page 2', () => {
    it('Username is mandatory when creating a new answer', () => {
        const answers = ["Test Answer 1", "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Test Question 1').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type(answers[0]);
        cy.contains('Post Answer').click();
    });
});

describe('New Answer Page 3', () => {
    it('Answer is mandatory when creating a new answer', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Test Question 1').click();
        cy.contains('Answer Question').click();
        cy.contains('Post Answer').click();
        cy.contains('Answer text cannot be empty');
    });
});

describe('Search 1', () => {
    it('Search string in question text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.get('#searchBar').type('navigation{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Search 2', () => {
    it('Search string matches tag and text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.get('#searchBar').type('navigation [React]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('All Tags 1', () => {
    it('Total Tag Count', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Tags').click();
        cy.contains('All Tags');
        cy.contains('6 Tags');
        cy.contains('Ask a Question');
    })
})

describe('All Tags 2', () => {
    it('Tag names and count', () => {
        const tagNames = ['react', 'javascript', 'android-studio', 'shared-preferences', 't2', 't1'];
        const tagCounts = ['1 question', '6 questions', '1 question', '1 question', '2 question', '2 question'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Tags').click();
        cy.get('.tagNode').each(($el, index, $list) => {
            cy.wrap($el).should('contain', tagNames[index]);
            cy.wrap($el).should('contain', tagCounts[index]);
        })
    })
})

describe('All Tags 3', () => {
    it('Click Tag Name', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Programmatically navigate using React router');
        cy.contains('2 answers');
        cy.contains('121 views');
        cy.contains('JoJi John');
        cy.contains('Jan 20');
        cy.contains('03:24');
    })
})