<template>
  <div class="container-sm" style="padding-top: 30px;padding-left:40px;padding-right:40px;max-width:530px">
    <div class="d-flex flex-column align-items-center">
      <img alt="deemos logo" src="@/assets/logo.png" class="mx-auto" style="width:150px"/>
      <h1>Constitution</h1>
      <small class="text-muted">The document that keeps the motor runing</small>
    </div>
    <dl class="row" style="margin-top:40px">
      <dt class="col-sm-3">1. Freedom</dt>
      <dd class="col-sm-9">
        Freedom of speech and expression. Freedom to propose changes to the
        constitution.
      </dd>
      <dt class="col-sm-3 text-truncate">2. Fun</dt>
      <dd class="col-sm-9">
       We are here to have fun but also aim to be competitive while valuing
        kindness, participation, meritocracy, transparency and diversity.
      </dd>
      <dt class="col-sm-3">3. Fairness</dt>
      <dd class="col-sm-9">
        Deemos will avoid concentration of power by emulating a three-branch
        government system. Executive, Legislative, Judicial. All positions are
        to be elected.
      </dd>
    </dl>
    <a href="https://discord.gg/mSqPUzg7kt"><img src="@/assets/discord_logo.png" style="display:block;width:150px;margin-left:auto;margin-right:auto" target="new"/></a>
  </div>
</template>
<script>
export default {
  name: "HomePage",
};
</script>
