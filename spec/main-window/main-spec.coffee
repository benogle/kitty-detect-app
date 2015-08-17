Main = require '../../src/main-window/main'

describe "Main", ->
  [main] = []
  beforeEach ->
    main = new Main()

  it "displays hello", ->
    expect(main.element.textContent).toContain 'Hello World'
