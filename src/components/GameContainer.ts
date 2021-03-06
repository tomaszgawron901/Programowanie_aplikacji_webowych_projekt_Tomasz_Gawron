import IComponent from './IComponent';
import Board from './boardComponents/Board';
import HeadContainer from './headComponents/HeadContainer';
import Menu from './MenuComponents/menu';
import GameOptionsTab from './MenuComponents/GameOptionsMenuTab';
import ThemeOptionsMenuTab from './MenuComponents/ThemeOptionsMenuTab';
import RankingOprionsMenuTab from './MenuComponents/RankingOprionsMenuTab';

export default class GameContainer implements IComponent {
    private board: Board;
    private head: HeadContainer;
    private menu: Menu;

    private theme: string;

    public get Board(): Board{
        return this.board;
    }

    public get Head(): HeadContainer{
        return this.head;
    }

    public get Menu(): Menu{
        return this.menu;
    }

    private element: HTMLElement;
    private boardContainer: HTMLDivElement;

    public constructor(){
        this.InitializeHead();
        this.InitializeMenu();
        this.InitializeBoardContainer();
        this.InitializeElement();
    }

    public SetTheme(theme: string){
        if(this.theme == null){
            this.element.classList.add(theme);
        }else{
            this.element.classList.replace(this.theme, theme);
        }
        this.theme = theme;
    }

    private InitializeElement(){
        this.element = document.createElement('DIV') as HTMLDivElement;

        const mainContainer = document.createElement('DIV');
        mainContainer.classList.add("GameContainer");
        mainContainer.classList.add("BorderedContainer");
        mainContainer.addEventListener('contextmenu', event => event.preventDefault());

        const headConteiner = document.createElement('DIV');
        headConteiner.classList.add("ReversedBorderedContainer");
        headConteiner.classList.add("HeadContainer");
        headConteiner.appendChild(this.head.GetComponent());

        mainContainer.appendChild(headConteiner);
        mainContainer.appendChild(this.boardContainer);

        this.element.appendChild(this.menu.GetComponent());
        this.element.appendChild(mainContainer);
        this.SetTheme('normal_theme');
    }

    private InitializeMenu(){
        this.menu = new Menu();
        this.menu.AddItem(0, "Game", new GameOptionsTab());
        this.menu.AddItem(1, "Theme", new ThemeOptionsMenuTab());
        this.menu.AddItem(2, "Ranking", new RankingOprionsMenuTab());
    }

    private InitializeHead(){
        this.head = new HeadContainer();
    }

    private InitializeBoardContainer(){
        this.boardContainer = document.createElement('DIV') as HTMLDivElement;
        this.boardContainer.classList.add("ReversedBorderedContainer");
        this.boardContainer.style.marginTop = "10px";
        this.boardContainer.style.userSelect = 'none';
    }

    public SetNewBoard( size: {width: number, height: number}) {
        this.board = new Board(size);
        this.boardContainer.innerHTML = "";
        this.boardContainer.appendChild(this.board.GetComponent());
    }

    public GetComponent() {
        return this.element;
    }

    public Reset(){
        this.head.Reset();
        this.board.Reset();
    }

}