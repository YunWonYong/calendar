export type LobbyAsideState = "expanded" | "collapsed";

export type LobbyAsideProps = {
    asideState: LobbyAsideState;
    toggleAsideState: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};