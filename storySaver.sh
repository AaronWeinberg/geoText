### ### ### ### ### ####
#  storySaver startup  #
### ### ### ### ### ####

## remove generated files/directories and rebuild
# tmux send-keys 'npm run purge' Enter;
# tmux send-keys 'npm run clean' Enter;
# tmux send-keys 'pnpm i' Enter;

## create new panes
tmux rename-window 'storySaver';
tmux split-window -h -p 33
tmux split-window -v -t 1 -p 66;
tmux split-window -v -t 0 -p 33;

## shell (-t 1)
tmux send-keys -t 0 'code .' Enter;
tmux send-keys -t 0 'clear' Enter;

## typescript watcher (-t 2)
tmux send-keys -t 1 'npm run watch' Enter;

## web bundler (-t 3)
tmux send-keys -t 2 'npm run client' Enter;

## server (-t 0)
tmux send-keys -t 3 'npm run server' Enter;

## focus shell
tmux select-pane -t 0