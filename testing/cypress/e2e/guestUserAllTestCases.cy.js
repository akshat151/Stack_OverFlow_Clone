describe('Populating the database', () => {
    it('Populating the database', () => {
        cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/init.js mongodb://127.0.0.1:27017/fake_so', { failOnNonZeroExit: false })
            .its('code')
            .should('eq', 0);
    });
});

describe('Login Page For Guest', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('successfully loads login page', () => {
      cy.contains('LOGIN');
    });

    it('Guest Button check', () => {
      cy.contains('GUEST').click();
      cy.contains('Fake Stack Overflow');
      cy.contains('Logout').click();
    });
  });

describe('Home Page 1', () => {
    it('successfully shows All Questions string', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('All Questions');
        cy.contains('Logout').click();
    })
})

describe('Home Page 2', () => {
    it('successfully shows logout button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Logout');
        cy.contains('Logout').click();

    })
})

describe('Home Page 3', () => {
    it('successfully shows total questions number', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('2 questions');
        cy.contains('Logout').click();

    })
})

describe('Home Page 4', () => {
    it('successfully shows filter buttons', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');
        cy.contains('Logout').click();

    })
})

describe ('Home Page 5', () => {
    it('successfully shows menu items', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Questions');
        cy.contains('Tags');
        cy.contains('Logout').click();

    })
})

describe ('Home Page 6', () => {
    it('successfully shows search bar', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.get('#searchBar');
        cy.contains('Logout').click();
    })
})

describe('Home Page 7', () => {
    it('successfully shows page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Logout').click();

    })
})

describe('Home Page 8', () => {
    it('successfully shows all questions in model', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        cy.contains('Logout').click();

    })
})

describe('Home Page 9', () => {
    it('successfully shows all question stats', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        const answers = ['3 answers','2 answers'];
        const views = ['129 views','121 views'];
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
        })
        cy.contains('Logout').click();

    })
})

describe('Home Page 10', () => {
    it('successfully shows all question authors and date time', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        const authors = ['saltyPeter', 'JoJi John'];
        const date = ['Oct 01', 'Jan 20'];
        const times = ['11:24', '03:24'];
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        })
        cy.contains('Logout').click();

    })
})

describe('Home Page 11', () => {
    it('pagination check next button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        const authors = ['saltyPeter', 'JoJi John'];
        const date = ['Oct 01', 'Jan 20'];
        const times = ['11:24', '03:24'];
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        })
        cy.contains('2 questions');
        cy.get('button:contains("next")').should('be.disabled');
        cy.contains('Logout').click();

    })
})

describe('Home Page 12', () => {
    it('pagination check prev button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        const authors = ['saltyPeter', 'JoJi John'];
        const date = ['Oct 01', 'Jan 20'];
        const times = ['11:24', '03:24'];
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        })
        cy.contains('2 questions');
        cy.get('button:contains("prev")').should('be.disabled');
        cy.contains('Logout').click();

    })
})

describe('Home Page 13', () => {
    it('successfully shows all questions in model in active order', () => {
        const qTitles = ['Programmatically navigate using React router', 'android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Active').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        cy.contains('Logout').click();

    })
})

describe('Home Page 14', () => {
    it('successfully shows all unanswered questions in model', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Unanswered').click();
        cy.contains('0 questions');
        cy.contains('Logout').click();

    })
})

describe('Answer Page 1', () => {
    it('Answer Page displays expected header', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('#answersHeader').should('contain', 'android studio save string shared preference, start activity and load the saved string');
        cy.get('#answersHeader').should('contain', '3 answers');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
        cy.contains('Logout').click();
    })
})

describe('Answer Page 2', () => {
    it('Answer Page displays expected question text', () => {
        const text = "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time I switch to a different view. I just hide/show my fragments depending on the icon selected. The problem I am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what I am using to refrain them from being recreated.";
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('#questionBody').should('contain', '131 views');
        cy.get('#questionBody').should('contain', text);
        cy.get('#questionBody').should('contain', 'saltyPeter');
        cy.get('#questionBody').should('contain', 'Oct 01, 2023');
        cy.get('#questionBody').should('contain', '11:24');
        cy.contains('Logout').click();
    })
})

describe('Answer Page 3', () => {
    it('Answer Page displays expected answers', () => {
        const answers = ["Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.", "YourPreference yourPreference = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);", "I just found all the above examples just too confusing, so I wrote my own. "];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
        cy.contains('Logout').click();
    });
});

describe('Answer Page 4', () => {
    it('Answer Page displays expected authors', () => {
        const authors = ['Natalie', 'Monica', 'Ross'];
        const date = ['Nov 18','Nov 12', 'Nov 01'];
        const times = ['09:24','03:30', '15:24'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.get('.answerAuthor').each(($el, index) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        });
        cy.contains('Logout').click();

    });
});

describe('Search 1', () => {
    it('Search string in question text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.get('#searchBar').type('navigation{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        cy.contains('Logout').click();

    })
})

describe('Search 2', () => {
    it('Search string matches tag and text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.get('#searchBar').type('navigation [React]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        cy.contains('Logout').click();

    })
})

describe('All Tags 1', () => {
    it('Total Tag Count', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Tags').click();
        cy.contains('All Tags');
        cy.contains('4 Tags');
        cy.contains('Logout').click();

    })
})

describe('All Tags 2', () => {
    it('Tag names and count', () => {
        const tagNames = ['react', 'javascript', 'android-studio', 'shared-preferences'];
        const tagCounts = ['1 question', '2 question', '1 question', '1 question'];
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Tags').click();
        cy.get('.tagNode').each(($el, index, $list) => {
            cy.wrap($el).should('contain', tagNames[index]);
            cy.wrap($el).should('contain', tagCounts[index]);
        })
        cy.contains('Logout').click();
    })
})

describe('All Tags 3', () => {
    it('Click Tag Name', () => {
        cy.visit('http://localhost:3000');
        cy.contains('LOGIN');
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Programmatically navigate using React router');
        cy.contains('2 answers');
        cy.contains('121 views');
        cy.contains('JoJi John');
        cy.contains('Jan 20');
        cy.contains('03:24');
        cy.contains('Logout').click();

    })
})

describe('Deleting the database', () => {
    it('Deleting the database', () => {
        cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/destroy.js', { failOnNonZeroExit: false })
            .its('code')
            .should('eq', 0);
    });
});