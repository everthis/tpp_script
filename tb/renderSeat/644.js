module.exports =
  '<div class="xs-container">\n  <div class="xs-content">\n    <ul class="xseat-rows">\n      {@each data.rows as r}\n      <li>{@if r.rowName}${r.rowName}{@else}&nbsp;{@/if}</li>\n      {@/each}\n    </ul>\n  </div>\n</div>\n'
